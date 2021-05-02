"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOperation = exports.createOperation = exports.filterOperationByUser = exports.getOperations = void 0;
// import de conexion a db postgresql
const database_1 = require("../database");
const getOperations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM alkemy_operations WHERE state = true');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
exports.getOperations = getOperations;
const filterOperationByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.email || !req.params.search) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO"
        });
    }
    const email = req.params.email;
    const value = req.params.search;
    console.log('RECIBIENDO: ' + email, value);
    const a = 'SELECT alkemy_categories.name as category, id_operation, concept, amount, date ';
    const b = 'FROM alkemy_operations ';
    const c = 'INNER JOIN alkemy_categories ';
    const d = 'ON alkemy_operations.category = alkemy_categories.id ';
    const e = 'WHERE user_email = $1 ';
    let aux = 'AND ';
    let f = 'AND state = true';
    if (value === 'ingreso' || value === 'egreso') {
        aux += 'type = $2';
    }
    else {
        // const category = parseInt(value);
        aux += 'category = $2';
    }
    const query = a + b + c + d + e + aux + f;
    try {
        const response = yield database_1.pool.query(query, [email, value]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
exports.filterOperationByUser = filterOperationByUser;
const createOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO"
        });
    }
    const { userEmail, concept, amount, date, type, category, state } = req.body;
    const _amount = parseInt(amount);
    const _category = parseInt(category);
    const a = "INSERT INTO public.alkemy_operations(";
    const b = "user_email, concept, amount, date, type, category, state)";
    const c = " VALUES ($1, $2, $3, $4, $5, $6, $7);";
    const query = a + b + c;
    console.log(req.body);
    try {
        // insert en PostgreSQL
        yield database_1.pool.query(query, [userEmail, concept, _amount, date, type, _category, state]);
        return res.status(200).json(`The operation was inserted successfuly`);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("error to insert operation");
    }
});
exports.createOperation = createOperation;
const deleteOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id_operation) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO, falta el id de operación",
        });
    }
    try {
        const id_operation = parseInt(req.params.id_operation);
        yield database_1.pool.query('UPDATE public.Alkemy_operations SET state = false WHERE id_operation = $1', [id_operation]);
        return res.status(200).json(`Operation eliminated!`);
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .json("error trying to delete operation");
    }
});
exports.deleteOperation = deleteOperation;
