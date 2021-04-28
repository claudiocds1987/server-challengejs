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
exports.signin = exports.createUser = exports.getUser = exports.getUsers = void 0;
// import de conexion a db postgresql
const database_1 = require("../database");
// para encriptar password
const bcrypt = require('bcrypt');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM user');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUsers = getUsers;
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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
        return;
    }
    //guardo en constantes los datos recibidos Angular
    const { email, password } = req.body;
    console.log("Datos recibidos: ", email, password);
    const hash = yield bcrypt.hash(password, 10); // encripta el password
    // insert en PostgreSQL
    yield database_1.pool
        .query("INSERT INTO public.user (email, password) VALUES ($1, $2);", [email, hash])
        .then((data) => {
        res.status(200).send({ message: "The user was inserted successfuly" });
    })
        .catch((error) => {
        res
            .status(400).send({
            message: "Error to insert user " + error,
        });
    });
});
exports.createUser = createUser;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
        return;
    }
    yield database_1.pool.query(`SELECT * FROM user WHERE user.email = '${req.body.email}'`).then((data) => {
        // obtengo el pass que devolvio la query
        const password = data.rows[0].password;
        // obtengo el email que devolvio la query
        const email = data.rows[0].email;
        // console.log('password del usuario: ' + password);
        // console.log('ID usuario: ' + idUser);
        // comparo las contraseñas
        const resultPassword = bcrypt.compareSync(req.body.password, password);
        if (resultPassword) {
            res.status(200).send({ message: "The password is perfect!" });
        }
        else {
            console.log("las contraseñas no son iguales");
            // la contraseña es incorrecta
            return res.status(400).send({ message: "The password is not correct!" });
        }
    })
        .catch((error) => {
        res
            .status(400)
            .send({ message: "Error the email is not valid! " + error });
    });
});
exports.signin = signin;
