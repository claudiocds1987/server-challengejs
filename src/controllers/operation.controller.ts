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
    const response: QueryResult = await pool.query('SELECT * FROM alkemy_operations WHERE state = true');
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};  

export const getOperation = async (
  req: Request,
  res: Response
): Promise<Response> => {

  if (!req.params.id_operation) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO"
    });
  }

  const query = 'SELECT * FROM alkemy_operations WHERE id_operation = $1 AND state = true';

  try {
    const response: QueryResult = await pool.query(query, [req.params.id_operation]);
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

  if (!req.params.email || !req.params.search) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO"
    });
  }

  const email = req.params.email;
  const value = req.params.search;

  console.log('RECIBIENDO: ' + email, value);
  
  const a = 'SELECT alkemy_categories.name as category, id_operation, concept, amount, date ';
  const b = 'FROM alkemy_operations ';
  const c = 'INNER JOIN alkemy_categories ';
  const d = 'ON alkemy_operations.category = alkemy_categories.id ';
  const e = 'WHERE user_email = $1 ';
  let aux = 'AND ';
  let f = 'AND state = true'

  if(value === 'ingreso' || value === 'egreso'){
    aux += 'type = $2';
  }else{
    // const category = parseInt(value);
    aux += 'category = $2';
  }

  const query = a + b + c + d + e + aux + f;

  try {

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
      state
  } = req.body;

  const _amount = parseInt(amount);
  const _category = parseInt(category)

  const a = "INSERT INTO public.alkemy_operations(";
  const b = "user_email, concept, amount, date, type, category, state)";
  const c = " VALUES ($1, $2, $3, $4, $5, $6, $7);"
  const query = a + b + c;

  console.log(req.body);

  try {
    // insert en PostgreSQL
    await pool.query(
      query,[userEmail, concept, _amount, date, type, _category, state]
    );
    return res.status(200).json(`The operation was inserted successfuly`);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("error to insert operation");
  }
    
};

export const updateOperation = async (
  req: Request,
  res: Response
): Promise<Response> => {

  if (!req.body || !req.params.id_operation) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO"
    });
}

  const {
    id_operation,
    userEmail,
    concept,
    amount,
    date,
    type,
    category,
    state
  } = req.body;
  
  console.log(req.body);

  const id_op = parseInt(id_operation);

  const a = 'UPDATE alkemy_operations SET user_email = $1, concept = $2, amount = $3, date = $4, type = $5,';
  const b = ' category = $6, state = $7';
  const c = ' WHERE id_operation = $8';
  const query = a + b + c;
  
  await pool.query(
    query,
    [
      userEmail,
      concept,
      amount,
      date,
      type,
      category,
      state,
      id_op 
    ]
  );
  return res.status(200).json('Operation updated successfully!'); 
  // return res.json({
  //   message: "Operation updated successfully!",
  //   body: {
  //     Operation: {
  //       id_operation,
  //       userEmail,
  //       concept,
  //       amount,
  //       date,
  //       type,
  //       category,
  //       state    
  //     },
  //   },
  // });
};

export const deleteOperation = async (req: Request, res: Response): Promise<Response> => {
  if (!req.params.id_operation) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO, falta el id de operación",
    });
  }
   try {
   const id_operation = parseInt(req.params.id_operation);
    await pool.query('UPDATE public.Alkemy_operations SET state = false WHERE id_operation = $1', [id_operation]);
    return res.status(200).json('Operation deleted!');    
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("error trying to delete operation");
  }
}

