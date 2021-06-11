"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// validations
const validations = require('./../validations/general-validations');
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth.controller");
router.post('/api/auth/signup', validations.validate(validations.userSignUpValidation), auth_controller_1.signup);
router.post('/api/auth/login', validations.validate(validations.userLoginValidation), auth_controller_1.login);
exports.default = router;
