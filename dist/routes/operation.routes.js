"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// router de express para crear las rutas
const express_1 = require("express");
const router = express_1.Router();
// import operation-controller
const operation_controller_1 = require("../controllers/operation.controller");
// routes
router.post('/api/operations', operation_controller_1.createOperation);
router.get('/api/operations/:email/:type', operation_controller_1.getAllOperationsByUserAndType);
// export del objeto router para que lo puedan usar otros archivos
exports.default = router;