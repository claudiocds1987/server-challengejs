"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// router de express para crear las rutas
const express_1 = require("express");
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth.controller");
router.post('/api/auth/createUser', auth_controller_1.createUser);
router.post('/api/auth/login', auth_controller_1.login);
exports.default = router;
