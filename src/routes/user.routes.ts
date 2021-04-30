// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

// import user-controller
import { getUsers, getUser, checkUserEmail, getLastUsers } from '../controllers/user.controller';

// routes
router.get('/api/users', getUsers);
router.get('/api/users/last', getLastUsers);
router.get('/api/users/:email', getUser);
router.get('/api/users/check/:email', checkUserEmail);

export default router;
