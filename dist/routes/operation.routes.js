"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// import operation-controller
const operation_controller_1 = require("../controllers/operation.controller");
// routes
router.post('/api/operations', operation_controller_1.createOperation);
router.get('/api/operations/:id_operation', operation_controller_1.getOperation);
router.get('/api/operations/filter/:email/:search', operation_controller_1.filterOperationByUser);
router.get('/api/operations', operation_controller_1.getOperations);
router.get('/api/operations/user/:email', operation_controller_1.getOperationsByUser);
router.put('/api/operations/:id_operation', operation_controller_1.updateOperation);
router.put('/api/operations/delete/:id_operation', operation_controller_1.deleteOperation);
exports.default = router;
