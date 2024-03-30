import bcrypt from "bcrypt";
import db from "../db.js";
import User from "../models/user.js";
import { generateAccessToken } from "../utils/auth.js";

const getSaltRounds = () => {
  const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 10;
  return parseInt(saltRounds);
};

const register = async (req, res) => {
  const { email, username: requestUsername, password } = req.body;
  const username = email || requestUsername;

  // Validación de entrada
  if (!username || !password) {
    return res.status(400).send({ error: "Missing credentials" });
  }

  // Validar si el usuario ya existe
  const existingUser = await db.user.findUser(username);
  if (existingUser) {
    return res.status(409).send({ error: "Username already taken" });
  }

  // Crear un nuevo usuario (usar bcrypt para contraseñas seguras)
  const hashedPassword = await bcrypt.hash(password, getSaltRounds()); // Reemplazar por bcrypt
  const user = new User({ username, password: hashedPassword });
  await db.user.saveUser(user);

  // Enviar respuesta
  res.status(201).send({ success: "User registered successfully" });
};

const login = async (req, res) => {
  const { email, username: requestUsername, password } = req.body;
  const username = email || requestUsername;

  // Validación de entrada
  if (!username || !password) {
    return res.status(400).send({ error: "Missing credentials" });
  }

  // Buscar al usuario por nombre de usuario
  const user = await db.user.findUser(username);

  // Verificar la contraseña
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send({ error: "Invalid credentials" });
  }

  // Generar un token de acceso
  const accessToken = generateAccessToken(user.id);

  // Enviar respuesta
  res.status(200).send({ success: "Logged in successfully", accessToken });
};

export { register, login };
