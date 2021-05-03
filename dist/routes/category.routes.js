"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// import operation-controller
const category_controller_1 = require("../controllers/category.controller");
// routes
router.get('/api/categories', category_controller_1.getCategories);
exports.default = router;
