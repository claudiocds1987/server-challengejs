"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
require('dotenv').config();
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { "rejectUnauthorized": false },
    port: 5432
});
