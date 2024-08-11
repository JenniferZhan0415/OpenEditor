import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import { config } from "dotenv";

config();
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY ?? "";

const readUser = () => {
  const data = fs.readFileSync("./data/user.json");
  const users = JSON.parse(data);
  return users;
};

router.post("/", async (req, res) => {
  let { username, password } = req.body;
  const users = readUser();
  const user = users[username];
  if (user && (await bcrypt.compare(password, user.hashedPassword))) {
    let token = jwt.sign({ username }, SECRET_KEY);
    res.json({ token: token });
  } else {
    res.sendStatus(401);
  }
});

export default router;
