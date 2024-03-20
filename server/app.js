const express = require('express');
const app = express();
const mongoose = require('./db'); // Importa la conexión a la base de datos
const User = require('./models/user'); // Reemplazar por el modelo de tu base de datos
const auth = require('./utils/auth');

// Usar JSON en las peticiones
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Registrar un usuario
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validación de entrada (ejemplo simple)
  if (!username || !password) {
    return res.status(400).send({ error: 'Missing credentials' });
  }

  // Validar si el usuario ya existe (ejemplo simple)
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).send({ error: 'Username already taken' });
  }

  // Crear un nuevo usuario (usar bcrypt para contraseñas seguras)
  const hashedPassword = await bcrypt.hash(password, 10); // Reemplazar por bcrypt
  const user = new User({ username, password: hashedPassword });
  await user.save();

  // Enviar respuesta
  res.status(201).send({ success: 'User registered successfully' });
});

// Iniciar sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validación de entrada (ejemplo simple)
  if (!username || !password) {
    return res.status(400).send({ error: 'Missing credentials' });
  }

  // Buscar al usuario por nombre de usuario
  const user = await User.findOne({ username });

  // Verificar la contraseña (usar bcrypt para comparar)
  if (!user || !bcrypt.compareSync(password, user.password)) { // Reemplazar por bcrypt
    return res.status(401).send({ error: 'Invalid credentials' });
  }

  // Generar un token de acceso
  const accessToken = auth.generateAccessToken(user._id);

  // Enviar respuesta
  res.status(200).send({ success: 'Logged in successfully', accessToken });
});

// Ruta protegida (ejemplo)
app.get('/protected-route', auth.isAuthenticated, (req, res) => {
  // ... Logica para la ruta protegida
  res.send({ message: 'Success! This is a protected route.' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
