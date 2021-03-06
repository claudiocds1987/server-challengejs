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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
// import de conexion a db postgresql
const database_1 = require("../database");
// para encriptar password
const bcrypt = require("bcrypt");
// npm i jsonwebtoken y tambien npm i @types/jsonwebtoken -D (para que reconosca los metodos)
// ver archivo .env y tener dotenv.config(); en index.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password || !req.body.registration_date) {
        res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
        return;
    }
    const { email, password, registration_date } = req.body;
    console.log("Datos recibidos: ", email, password);
    const hash = yield bcrypt.hash(password, 10); // encripta el password
    yield database_1.pool
        .query("INSERT INTO public.alkemy_user (email, password, registration_date) VALUES ($1, $2, $3);", [email, hash, registration_date])
        .then((data) => {
        res.status(200).send({ message: "The user was inserted successfuly" });
    })
        .catch((error) => {
        res.status(400).send({
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
    yield database_1.pool
        .query(`SELECT * FROM alkemy_user WHERE email = '${req.body.email}'`)
        .then((data) => {
        // obtengo el password de la respuesta
        const password = data.rows[0].password;
        // comparo las contrase??as
        const resultPassword = bcrypt.compareSync(req.body.password, password);
        if (resultPassword) {
            // genero el token
            const token = jsonwebtoken_1.default.sign({ _userEmail: data.rows[0].email }, process.env.TOKEN_SECRET || "tokentest", {
                // duracion del token
                expiresIn: 60 * 60 * 24,
            });
            // creando un objeto dataUser
            const dataUser = {
                email: data.rows[0].email,
                token: token,
            };
            console.log("usuario logeado con token: " + token);
            // enviando el token a los headers
            res.header("auth-token", token).json(dataUser);
            // res.status(200).send({ message: "The password is perfect!" });
        }
        else {
            console.log("las contrase??as no son iguales");
            return res
                .status(400)
                .send({ message: "The password is not correct!" });
        }
    })
        .catch((error) => {
        res
            .status(400)
            .send({ message: "Error the email is not valid! " + error });
    });
});
exports.login = login;
// LOGIN SIN GENERAR TOKEN
// export const login = async (req: Request, res: Response) => {
//   if (!req.body.email || !req.body.password) {
//     res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
//     return;
//   }
//   await pool
//     .query(`SELECT * FROM alkemy_user WHERE email = '${req.body.email}'`)
//     .then((data) => {
//       // obtengo el password de la respuesta
//       const password = data.rows[0].password;
//       // comparo las contrase??as
//       const resultPassword = bcrypt.compareSync(req.body.password, password);
//       if (resultPassword) {
//         res.status(200).send({ message: "The password is perfect!" });
//       } else {
//         //console.log("Perfect the passwords are equal!");
//         return res
//           .status(400)
//           .send({ message: "The password is not correct!" });
//       }
//     })
//     .catch((error) => {
//       res
//         .status(400)
//         .send({ message: "Error the email is not valid! " + error });
//     });
// };
