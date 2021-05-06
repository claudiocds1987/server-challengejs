import express from 'express';
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

const cors = require("cors");
app.use(cors());
// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// IMPORTS DE LAS RUTAS
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import operationRoutes from './routes/operation.routes';
import categoryRoutes from './routes/category.routes';

app.use(authRoutes);
app.use(userRoutes);
app.use(operationRoutes);
app.use(categoryRoutes);

// Tomo el puerto del sistema operativo o el 3000
app.set("port", process.env.PORT || 3000);

// Inicio el servidor
app.listen(app.get("port"), () => {
  console.log("usuarios server on port:", app.get("port"));
});

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});
