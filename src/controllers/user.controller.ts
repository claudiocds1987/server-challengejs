import {Request, Response} from 'express';
// Para que los response sean de tipo QueryResult
import {QueryResult} from 'pg';
// import de conexion a db postgresql
import {pool} from '../database';

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
    //   const response: QueryResult = await pool.query(`SELECT * FROM alkemy_user WHERE email LIKE '%${req.params.email}%'`);
    const response: QueryResult = await pool.query(`SELECT * FROM alkemy_user WHERE email = '${req.params.email}'`);
      if (res.json(response.rowCount > 0)) {
           return res.status(200);
      }      
  }
  catch (e) {
      console.log(e);
      res.status(500).json('error al buscar el email de usuario');
  }
}


  