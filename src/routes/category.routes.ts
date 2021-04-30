// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

// import operation-controller
import { getCategories } from '../controllers/category.controller';

// routes
router.get('/api/categories', getCategories);

export default router;