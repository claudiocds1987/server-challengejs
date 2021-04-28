"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require('morgan'); // ?
// despues de instalar express instalar npm i @types/express -D para que typescript entienda express
const app = express_1.default();
app.use(morgan('dev')); // ?
const cors = require("cors");
app.use(cors());
// MIDDLEWARES
app.use(express_1.default.json());
// para convertir los datos enviados de un form html en objeto json
app.use(express_1.default.urlencoded({ extended: false }));
// IMPORTS DE LAS RUTAS
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use(user_routes_1.default);
// Configuro el puerto. Tomo el puerto del sistema operativo o el 3000
app.set("port", process.env.PORT || 3000);
// Inicio el servidor
app.listen(app.get("port"), () => {
    console.log("usuarios server on port:", app.get("port"));
});
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});
// app.listen(4000, () => {
//     console.log('Server corriendo on port', 4000)
// })
