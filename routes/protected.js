const protected = (req, res) => {
  // ... Logica para la ruta protegida
  res.send({ message: "Success! This is a protected route." });
};

module.exports = {
  protected,
};
