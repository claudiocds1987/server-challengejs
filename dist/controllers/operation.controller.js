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
exports.createOperation = exports.getAllOperationsByUserAndType = void 0;
// import de conexion a db postgresql
const database_1 = require("../database");
const getAllOperationsByUserAndType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.email;
    const type = req.params.type;
    try {
        const response = yield database_1.pool.query("SELECT * FROM alkemy_operations WHERE user_email = $1 AND type = $2", [userEmail, type]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
exports.getAllOperationsByUserAndType = getAllOperationsByUserAndType;
const createOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO"
        });
    }
    const { userEmail, concept, amount, date, type, category, } = req.body;
    const _amount = parseInt(amount);
    const a = "INSERT INTO public.alkemy_operations(";
    const b = "user_email, concept, amount, date, type, category)";
    const c = " VALUES ($1, $2, $3, $4, $5, $6);";
    const query = a + b + c;
    console.log(req.body);
    try {
        // insert en PostgreSQL
        yield database_1.pool.query(query, [userEmail, concept, _amount, date, type, category]);
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
