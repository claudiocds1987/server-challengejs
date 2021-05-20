import {Router} from 'express'

const router = Router();

// import operation-controller
import { createOperation, getOperations, getOperationsByUser, getOperation, filterOperationByUser, updateOperation, deleteOperation } from '../controllers/operation.controller';

// routes
router.post('/api/operations', createOperation);
router.get('/api/operations/:id_operation', getOperation);
router.get('/api/operations/filter/:email/:search', filterOperationByUser);
router.get('/api/operations', getOperations);
router.get('/api/operations/user/:email', getOperationsByUser);
router.put('/api/operations/:id_operation', updateOperation);
router.put('/api/operations/delete/:id_operation', deleteOperation);

export default router;