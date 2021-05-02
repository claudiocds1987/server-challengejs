"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// router de express para crear las rutas
const express_1 = require("express");
const router = express_1.Router();
// import operation-controller
const operation_controller_1 = require("../controllers/operation.controller");
// routes
router.post('/api/operations', operation_controller_1.createOperation);
router.get('/api/operations/:id_operation', operation_controller_1.getOperation);
router.get('/api/operations/filter/:email/:search', operation_controller_1.filterOperationByUser);
router.get('/api/operations', operation_controller_1.getOperations);
router.put('/api/operations/:id_operation', operation_controller_1.updateOperation);
router.put('/api/operations/delete/:id_operation', operation_controller_1.deleteOperation);
// export del objeto router para que lo puedan usar otros archivos
exports.default = router;
