import express, { Router } from "express";

const router = express.Router();

router.get("/:email", (req, res) => {
  const email = req.params.email;
  res.status(200).send(email);
});

export default router;
