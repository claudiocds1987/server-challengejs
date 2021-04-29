import {Request, Response} from 'express';
// Para que los response sean de tipo QueryResult
import {QueryResult} from 'pg';
// import de conexion a db postgresql
import {pool} from '../database';

// export const createOperation = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const response: QueryResult = await pool.query(`SELECT user.email FROM user WHERE user.email = '${req.params.email}'`);
//         return res.json(response.rows);
//     }
//     catch (e) {
//         console.log(e);
//         return res.status(500).json('error to creat operation');
//     }
// }