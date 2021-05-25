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
exports.checkUserEmail = exports.getUser = exports.getLastUsers = exports.getUsers = void 0;
// import de conexion a db postgresql
const database_1 = require("../database");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT email, registration_date FROM alkemy_user ORDER BY registration_date DESC');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUsers = getUsers;
const getLastUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = 'SELECT email, registration_date FROM alkemy_user';
    const b = ' ORDER BY registration_date DESC';
    const c = ' LIMIT 10';
    const query = a + b + c;
    try {
        const response = yield database_1.pool.query(query);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getLastUsers = getLastUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(`SELECT user.email FROM user WHERE user.email = '${req.params.email}'`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('error getting user');
    }
});
exports.getUser = getUser;
const checkUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.email) {
        return res.status(400).send({
            message: "FALTA CONTENIDO EN EL CUERPO"
        });
    }
    console.log('email recibido:' + req.params.email);
    try {
        //   const response: QueryResult = await pool.query(`SELECT * FROM alkemy_user WHERE email LIKE '%${req.params.email}%'`);
        const response = yield database_1.pool.query(`SELECT * FROM alkemy_user WHERE email = '${req.params.email}'`);
        if (res.json(response.rowCount > 0)) {
            return res.status(200);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json('error al buscar el email de usuario');
    }
});
exports.checkUserEmail = checkUserEmail;
