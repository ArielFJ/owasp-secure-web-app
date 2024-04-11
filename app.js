import express from "express";
import router from "./routes/index.js";
import { logRequest } from "./utils/request.js";
import db from "./db.js";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const app = express();

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3001'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options

// Usar JSON en las peticiones
app.use(express.json());

app.use("/", logRequest, cors(corsOptions), router);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send({ error: "Page not found" });
});

// Conectar a la base de datos
db.connect();

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
