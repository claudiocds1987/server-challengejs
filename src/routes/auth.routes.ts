// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

import { signup, login } from '../controllers/auth.controller';

router.post('/api/auth/signup', signup);
router.post('/api/auth/login', login);

export default router;