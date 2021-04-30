// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

import { createUser, login } from '../controllers/auth.controller';

router.post('/api/auth/createUser', createUser);
router.post('/api/auth/login', login);

export default router;