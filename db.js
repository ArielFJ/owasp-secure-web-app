const users = []; // Reemplaza la colección de usuarios

function connect() {
  // No se necesita conexión para arreglos locales
  console.log('Conectado a la base de datos (arreglos locales)');
}

function findUser(username) {
  return users.find(user => user.username === username);
}

function saveUser(user) {
  users.push(user);
  return user;
}

module.exports = {
  connect,
  findUser,
  saveUser,
};
