import {Request, Response} from 'express';
// Para que los response sean de tipo QueryResult
import {QueryResult} from 'pg';
// import de conexion a db postgresql
import {pool} from '../database';
// para encriptar password
const bcrypt = require('bcrypt'); 

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT email, registration_date FROM alkemy_user ORDER BY registration_date DESC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const getLastUsers = async (req: Request, res: Response): Promise<Response> => {
  
  const a = 'SELECT email, registration_date FROM alkemy_user';
  const b = ' ORDER BY registration_date DESC';
  const c = ' LIMIT 10';
  const query = a + b + c;
  
  try {
      const response: QueryResult = await pool.query(query);
      return res.status(200).json(response.rows);
  } catch (e) {
      console.log(e);
      return res.status(500).json('Internal Server Error');
  }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query(`SELECT user.email FROM user WHERE user.email = '${req.params.email}'`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('error getting user');
    }
}

export const checkUserEmail = async (req: Request, res: Response): Promise<any> => {

  if (!req.params.email) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO"
    });
     
  }

  console.log('email recibido:' + req.params.email);

  try {
      const response: QueryResult = await pool.query(`SELECT * FROM alkemy_user WHERE email LIKE '%${req.params.email}%'`);
      if (res.json(response.rowCount > 0)) {
           // si existe email en Angular obtengo true sino false
           return res.status(200);
      }      
  }
  catch (e) {
      console.log(e);
      res.status(500).json('error al buscar el email de usuario');
  }
}


export const createUser = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password || !req.body.registration_date) {
      res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
      return;
    }
    //guardo en constantes los datos recibidos Angular
    const { email, password, registration_date } = req.body;
    console.log("Datos recibidos: ", email, password);
    const hash = await bcrypt.hash(password, 10); // encripta el password
    // insert en PostgreSQL
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
        // obtengo el pass que devolvio la query
        const password = data.rows[0].password;
        // obtengo el email que devolvio la query
        const email = data.rows[0].email
        // console.log('password del usuario: ' + password);
        // console.log('ID usuario: ' + idUser);
        // comparo las contraseñas
        const resultPassword = bcrypt.compareSync(req.body.password, password);
        if (resultPassword) {
            res.status(200).send({ message: "The password is perfect!" });
        } else {
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
  };
  