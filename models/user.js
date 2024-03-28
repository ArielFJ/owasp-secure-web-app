import { v4 as uuidv4 } from "uuid";
class User {
  constructor({ username, password }) {
    this.id = uuidv4();
    this.username = username;
    this.password = password;
    this.createdAt = new Date();
  }
}

export default User;
