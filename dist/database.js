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
// EN ESTA NO GRABA LOS DATOS
// export const pool = new Pool({
//     user: 'zhanbghhtzsuee',
//     host: 'ec2-54-90-211-192.compute-1.amazonaws.com',
//     password: 'cd2e23e0bee95690066858e40d9e2c23a076b054a67d96e6bd770291c75a4ab5',
//     database: 'd83itoo1uvllf2',
//     //ssl: true,
//     ssl: { "rejectUnauthorized": false },
//     port: 5432
// })
// ESTA ES LA DE BOOKSTORE-SERVER
// export const pool = new Pool({
//     user: 'ohcmjxflybhuxs',
//     host: 'ec2-54-90-13-87.compute-1.amazonaws.com',
//     password: '87a7776853846d79ec4826d8f7c8a7a4b7d1cb6a1b94f13d88a34a06ebe93d30',
//     database: 'd6mtnl8db77ln6',
//     //ssl: true,
//     ssl: { "rejectUnauthorized": false },
//     port: 5432
// })
