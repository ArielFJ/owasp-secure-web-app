import e from "express";
import db from "../db.js";

const getUsers = (req, res) => {
  res.json(db.user.getUsers());
};

const getUser = (req, res) => {
  const user = db.user.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

export { getUsers, getUser };
