"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// para variables de entorno
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const app = express_1.default();
app.use(morgan('dev'));
const cors = require("cors");
app.use(cors());
// MIDDLEWARES
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// IMPORTS DE LAS RUTAS
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const operation_routes_1 = __importDefault(require("./routes/operation.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
app.use(auth_routes_1.default);
app.use(user_routes_1.default);
app.use(operation_routes_1.default);
app.use(category_routes_1.default);
// Tomo el puerto del sistema operativo o el 4000.
app.set("port", process.env.PORT || 4000);
// Inicio el servidor
app.listen(app.get("port"), () => {
    console.log("usuarios server on port:", app.get("port"));
});
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});
