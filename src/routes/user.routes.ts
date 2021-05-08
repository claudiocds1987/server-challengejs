import {Router} from 'express'
import express from "express";
const app = express();
const cors = require("cors");

const router = Router();

// import user-controller
import { getUsers, getUser, checkUserEmail, getLastUsers } from '../controllers/user.controller';

// routes
router.get('/api/users', getUsers);
router.get('/api/users/last', getLastUsers);
router.get('/api/users/:email', getUser);
router.get('/api/users/check/:email', checkUserEmail);

export default router;
