// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

// import operation-controller
import { createOperation, getAllOperationsByUserAndType } from '../controllers/operation.controller';

// routes
router.post('/api/operations', createOperation);
router.get('/api/operations/:email/:type', getAllOperationsByUserAndType);






// export del objeto router para que lo puedan usar otros archivos
export default router;