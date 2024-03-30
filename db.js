import fs from "fs";
let users = []; // Reemplaza la colección de usuarios

function connect() {
  console.log("Conectado a la base de datos (arreglos locales)");
  if (fs.existsSync("db/users.json")) {
    users = JSON.parse(fs.readFileSync("db/users.json", "utf8"));
  }
}

function findUser(username) {
  return users.find((user) => user.username === username);
}

function findById(id) {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  delete user.password;
  return user;
}

function getUsers() {
  return users.map(({ password, ...user }) => user);
}

function saveUser(user) {
  users.push(user);
  saveToFile();
  return user;
}

function saveToFile() {
  // Guarda los usuarios en un archivo
  const json = JSON.stringify(users);

  if (!fs.existsSync("db")) {
    fs.mkdirSync("db");
  }

  fs.writeFileSync("db/users.json", json, "utf8");
}

export default {
  connect,
  user: { findUser, findById, saveUser, getUsers },
  saveToFile,
};
