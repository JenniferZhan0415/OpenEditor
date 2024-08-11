import express from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY ?? "";

function authorize(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.decoded = payload;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}

router.get("/", authorize, (req, res) => {
  res.json(req.decoded);
  console.log("Authentication succeeded for user: ", username);
  console.log(`${req.user.username} is logged in`);
});

export default router;
