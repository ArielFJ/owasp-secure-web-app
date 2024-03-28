import express from "express";
import router from "./routes/index.js";
import { printRequest } from "./utils/request.js";
import db from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Usar JSON en las peticiones
app.use(express.json());

app.use("/", printRequest, router);

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
