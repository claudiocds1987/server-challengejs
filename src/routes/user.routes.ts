// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

// import user-controller
import { getUsers, getUser, createUser, login, checkUserEmail, getLastUsers } from '../controllers/user.controller';

// routes
router.get('/api/users', getUsers);
router.get('/api/users/last', getLastUsers);
router.get('/api/users/:email', getUser);
router.get('/api/users/check/:email', checkUserEmail);
router.post('/api/users', createUser);
router.post('/api/users/login', login);

export default router;
