// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

// import de los controllers
import { getUsers, getUser, createUser } from '../controllers/user.controller';

router.get('/api/users', getUsers) // creo q solo necesito crear y obtener user por id
router.get('/api/users/:email', getUser)
router.post('/api/users', createUser)


// router.get('/operations')

// export del objeto router para que lo puedan usar otros archivos
export default router;
