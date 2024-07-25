import express, { json, Router } from "express";
import fs from "fs";

const router = express.Router();
const file_path = "./data/user.json";

router.get("/:email", (req, res) => {
  const email = req.params.email.toString();

  const userData = JSON.parse(fs.readFileSync(file_path));
  console.log(userData);

  const reqData = userData.find((user) => user.email == email);
  if (reqData) {
    console.log(reqData.documentIds);
    res.status(200).send(reqData.documentIds);
  } else {
    res.send("user doesn't exist, please create a new account");
  }
});

export default router;
