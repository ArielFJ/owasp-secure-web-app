const express = require("express");
const app = express();
const mongoose = require("./db"); // Importa la conexión a la base de datos
const User = require("./models/user"); // Reemplazar por el modelo de tu base de datos
const auth = require("./utils/auth");
const { protected } = require("./routes/protected");
const { register, login } = require("./routes/auth");

// Usar JSON en las peticiones
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// Registrar un usuario
app.post("/register", register);

// Iniciar sesión
app.post("/login", login);

// Ruta protegida (ejemplo)
app.get("/protected-route", auth.isAuthenticated, protected);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send({ error: "Page not found" });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
