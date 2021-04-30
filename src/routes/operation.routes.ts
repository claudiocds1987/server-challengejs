// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

// import operation-controller
import { createOperation, getOperationsByUserAndType, getOperations } from '../controllers/operation.controller';

// routes
router.post('/api/operations', createOperation);
router.get('/api/operations/:email/:type', getOperationsByUserAndType);
//router.get('/api/operations/:type', getOperationsByType);//?
router.get('/api/operations', getOperations);






// export del objeto router para que lo puedan usar otros archivos
export default router;