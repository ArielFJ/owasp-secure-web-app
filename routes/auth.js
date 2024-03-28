const register = async (req, res) => {
  const { username, password } = req.body;

  // Validación de entrada (ejemplo simple)
  if (!username || !password) {
    return res.status(400).send({ error: "Missing credentials" });
  }

  // Validar si el usuario ya existe (ejemplo simple)
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).send({ error: "Username already taken" });
  }

  // Crear un nuevo usuario (usar bcrypt para contraseñas seguras)
  const hashedPassword = await bcrypt.hash(password, 10); // Reemplazar por bcrypt
  const user = new User({ username, password: hashedPassword });
  await user.save();

  // Enviar respuesta
  res.status(201).send({ success: "User registered successfully" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // Validación de entrada (ejemplo simple)
  if (!username || !password) {
    return res.status(400).send({ error: "Missing credentials" });
  }

  // Buscar al usuario por nombre de usuario
  const user = await User.findOne({ username });

  // Verificar la contraseña (usar bcrypt para comparar)
  if (!user || !bcrypt.compareSync(password, user.password)) {
    // Reemplazar por bcrypt
    return res.status(401).send({ error: "Invalid credentials" });
  }

  // Generar un token de acceso
  const accessToken = auth.generateAccessToken(user._id);

  // Enviar respuesta
  res.status(200).send({ success: "Logged in successfully", accessToken });
};
