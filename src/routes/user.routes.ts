// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

// import user-controller
import { getUsers, getUser, createUser, login } from '../controllers/user.controller';

// routes
router.get('/api/users', getUsers);
router.get('/api/users/:email', getUser);
router.post('/api/users', createUser);
router.post('/api/users/login', login);

// export del objeto router para que lo puedan usar otros archivos
export default router;
