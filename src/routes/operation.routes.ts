// router de express para crear las rutas
import {Router} from 'express'

const router = Router();

// import operation-controller
import { createOperation, getOperations, filterOperationByUser, deleteOperation } from '../controllers/operation.controller';

// routes
router.post('/api/operations', createOperation);
router.get('/api/operations/filter/:email/:search', filterOperationByUser);
router.get('/api/operations', getOperations);
router.put('/api/operations/delete/:id_operation', deleteOperation);

// export del objeto router para que lo puedan usar otros archivos
export default router;