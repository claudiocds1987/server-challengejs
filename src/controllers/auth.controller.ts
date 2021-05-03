import {Request, Response} from 'express';
// Para que los response sean de tipo QueryResult
import {QueryResult} from 'pg';
// import de conexion a db postgresql
import {pool} from '../database';
// para encriptar password
const bcrypt = require('bcrypt'); 

export const signup = async (req: Request, res: Response) => {
    
    if (!req.body.email || !req.body.password || !req.body.registration_date) {
      res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
      return;
    }
    const { email, password, registration_date } = req.body;
    console.log("Datos recibidos: ", email, password);
    const hash = await bcrypt.hash(password, 10); // encripta el password

    await pool
      .query(
        "INSERT INTO public.alkemy_user (email, password, registration_date) VALUES ($1, $2, $3);",
        [email, hash, registration_date]
      )
      .then((data) => {
        res.status(200).send({ message: "The user was inserted successfuly" });
      })
      .catch((error) => {
        res
          .status(400).send({
            message:
              "Error to insert user " + error,
          });
      });
};

export const login = async (req: Request, res: Response) => {
    
    if (!req.body.email || !req.body.password) {
      res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
      return;
    }
   
    await pool.query(`SELECT * FROM alkemy_user WHERE email = '${req.body.email}'`).then((data) => {
        // obtengo el password de la respuesta
        const password = data.rows[0].password;
        // comparo las contraseñas
        const resultPassword = bcrypt.compareSync(req.body.password, password);
        if (resultPassword) {
            res.status(200).send({ message: "The password is perfect!" });
        } else {
          console.log("Perfect the passwords are equal!");
          return res.status(400).send({ message: "The password is not correct!" });
        }
      })
      .catch((error) => {
        res
          .status(400)
          .send({ message: "Error the email is not valid! " + error });
      });
};