import express from "express";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import fs from "fs";

const router = express.Router();
const saltRounds = 10;
config();

const readUser = () => {
  const data = fs.readFileSync("./data/user.json");
  const users = JSON.parse(data);
  return users;
};

const writeUser = (users) => {
  const data = JSON.stringify(users);
  fs.writeFileSync("./data/user.json", data);
  return users;
};

const hash = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    // console.log("Hashed password:", hash);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await hash(password);
  const users = readUser();
  // check unique username
  users[username] = {
    hashedPassword,
  };
  writeUser(users);
  console.log(hashedPassword);
  console.log(username);
  res.json({ success: "true" });
});

export default router;
