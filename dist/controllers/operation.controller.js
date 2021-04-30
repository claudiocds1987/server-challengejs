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
exports.createOperation = exports.getOperationsByUserAndType = exports.filterOperationByUser = exports.getOperations = void 0;
// import de conexion a db postgresql
const database_1 = require("../database");
const getOperations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('select * from alkemy_operations');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
exports.getOperations = getOperations;
// export const getOperationsByType = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   if (!req.params.type) {
//     return res.status(400).send({
//       message:
//         "FALTA CONTENIDO EN EL CUERPO"
//     });
//   }
//   try {
//     const a = 'select * from alkemy_operations ';
//     const b = 'where type = $1';
//     const query = a + b;
//     const response: QueryResult = await pool.query(query, [req.params.type]);
//     return res.status(200).json(response.rows);
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json("Internal server error");
//   }
// };  
const filterOperationByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const value = req.params.search;
    console.log('RECIBIENDO: ' + email, value);
    const a = 'SELECT alkemy_categories.name as category, id_operation, concept, amount, date ';
    const b = 'FROM alkemy_operations ';
    const c = 'INNER JOIN alkemy_categories ';
    const d = 'ON alkemy_operations.category = alkemy_categories.id ';
    const e = 'WHERE user_email = $1 ';
    let aux = 'AND ';
    if (value === 'ingreso' || value === 'egreso') {
        aux += 'type = $2';
    }
    else {
        const category = parseInt(value);
        aux += 'category = $2';
    }
    const query = a + b + c + d + e + aux;
    try {
        // const response: QueryResult = await pool.query("SELECT * FROM alkemy_operations WHERE user_email = $1 AND type = $2", [userEmail, type]);
        const response = yield database_1.pool.query(query, [email, value]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
exports.filterOperationByUser = filterOperationByUser;
const getOperationsByUserAndType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.email;
    const type = req.params.type;
    try {
        const a = 'SELECT alkemy_categories.name as category, id_operation, concept, amount, date ';
        const b = 'FROM alkemy_operations ';
        const c = 'INNER JOIN alkemy_categories ';
        const d = 'ON alkemy_operations.category = alkemy_categories.id ';
        const e = 'WHERE user_email = $1 ';
        const f = 'AND type = $2';
        const query = a + b + c + d + e + f;
        // const response: QueryResult = await pool.query("SELECT * FROM alkemy_operations WHERE user_email = $1 AND type = $2", [userEmail, type]);
        const response = yield database_1.pool.query(query, [userEmail, type]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
exports.getOperationsByUserAndType = getOperationsByUserAndType;
const createOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO"
        });
    }
    const { userEmail, concept, amount, date, type, category, } = req.body;
    const _amount = parseInt(amount);
    const _category = parseInt(category);
    const a = "INSERT INTO public.alkemy_operations(";
    const b = "user_email, concept, amount, date, type, category)";
    const c = " VALUES ($1, $2, $3, $4, $5, $6);";
    const query = a + b + c;
    console.log(req.body);
    try {
        // insert en PostgreSQL
        yield database_1.pool.query(query, [userEmail, concept, _amount, date, type, _category]);
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
