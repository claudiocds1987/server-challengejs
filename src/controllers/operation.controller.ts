import {Request, Response} from 'express';
// Para que los response sean de tipo QueryResult
import {QueryResult} from 'pg';
// import de conexion a db postgresql
import {pool} from '../database';

export const getOperations = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {
    const response: QueryResult = await pool.query('select * from alkemy_operations');
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};  


export const filterOperationByUser = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const email = req.params.email;
  const value = req.params.search;

  console.log('RECIBIENDO: ' + email, value);
  
  const a = 'SELECT alkemy_categories.name as category, id_operation, concept, amount, date ';
  const b = 'FROM alkemy_operations ';
  const c = 'INNER JOIN alkemy_categories ';
  const d = 'ON alkemy_operations.category = alkemy_categories.id ';
  const e = 'WHERE user_email = $1 ';
  let aux = 'AND ';

  if(value === 'ingreso' || value === 'egreso'){
    aux += 'type = $2';
  }else{
    const category = parseInt(value);
    aux += 'category = $2';
  }

  const query = a + b + c + d + e + aux;

  try {

    // const response: QueryResult = await pool.query("SELECT * FROM alkemy_operations WHERE user_email = $1 AND type = $2", [userEmail, type]);
    const response: QueryResult = await pool.query(query, [email, value]);
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};  


export const createOperation = async (req: Request, res: Response): Promise<Response> => {

  if (!req.body) {
      return res.status(400).send({
        message:
          "FALTA CONTENIDO EN EL CUERPO"
      });
  }

  const {
      userEmail,
      concept,
      amount,
      date,
      type,
      category,
  } = req.body;

  const _amount = parseInt(amount);
  const _category = parseInt(category)

  const a = "INSERT INTO public.alkemy_operations(";
  const b = "user_email, concept, amount, date, type, category)";
  const c = " VALUES ($1, $2, $3, $4, $5, $6);"
  const query = a + b + c;

  console.log(req.body);

  try {
    // insert en PostgreSQL
    await pool.query(
      query,[userEmail, concept, _amount, date, type, _category]
    );
    return res.status(200).json(`The operation was inserted successfuly`);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("error to insert operation");
  }
    
};   

