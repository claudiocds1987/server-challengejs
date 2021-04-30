"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// router de express para crear las rutas
const express_1 = require("express");
const router = express_1.Router();
// import user-controller
const user_controller_1 = require("../controllers/user.controller");
// routes
router.get('/api/users', user_controller_1.getUsers);
router.get('/api/users/last', user_controller_1.getUsers);
router.get('/api/users/:email', user_controller_1.getUser);
router.get('/api/users/check/:email', user_controller_1.checkUserEmail);
router.post('/api/users', user_controller_1.createUser);
router.post('/api/users/login', user_controller_1.login);
// export del objeto router para que lo puedan usar otros archivos
exports.default = router;
