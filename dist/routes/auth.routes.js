"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth.controller");
router.post('/api/auth/signup', auth_controller_1.signup);
router.post('/api/auth/login', auth_controller_1.login);
exports.default = router;
