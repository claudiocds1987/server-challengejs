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
exports.login = exports.signup = void 0;
// import de conexion a db postgresql
const database_1 = require("../database");
// para encriptar password
const bcrypt = require('bcrypt');
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password || !req.body.registration_date) {
        res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
        return;
    }
    //guardo en constantes los datos recibidos Angular
    const { email, password, registration_date } = req.body;
    console.log("Datos recibidos: ", email, password);
    const hash = yield bcrypt.hash(password, 10); // encripta el password
    // insert en PostgreSQL
    yield database_1.pool
        .query("INSERT INTO public.alkemy_user (email, password, registration_date) VALUES ($1, $2, $3);", [email, hash, registration_date])
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
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
        return;
    }
    yield database_1.pool.query(`SELECT * FROM alkemy_user WHERE email = '${req.body.email}'`).then((data) => {
        // obtengo el pass que devolvio la query
        const password = data.rows[0].password;
        // obtengo el email que devolvio la query
        const email = data.rows[0].email;
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
exports.login = login;
