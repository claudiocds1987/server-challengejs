import express from 'express';
const morgan = require('morgan'); // ?
// despues de instalar express instalar npm i @types/express -D para que typescript entienda express
const app = express();
app.use(morgan('dev')); // ?

const cors = require("cors");
app.use(cors());
// MIDDLEWARES
app.use(express.json());
// para convertir los datos enviados de un form html en objeto json
app.use(express.urlencoded({extended: false}))

// IMPORTS DE LAS RUTAS
import userRoutes from './routes/user.routes';


app.use(userRoutes);


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