import {Router} from 'express'
// validations
const validations = require('./../validations/general-validations');

const router = Router();

import { signup, login } from '../controllers/auth.controller';

router.post('/api/auth/signup', validations.validate(validations.userSignUpValidation), signup);
router.post('/api/auth/login', validations.validate(validations.userLoginValidation), login);

export default router;