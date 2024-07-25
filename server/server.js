import express, { json } from "express";
import { createServer } from "http";
import { Server as SocketIOSever } from "socket.io";
import fs from "fs";
import cors from "cors";

const app = express();

const server = createServer(app);

app.use(cors());
app.use(json());

app.post("/save/:documentId", (req, res) => {
  const { documentId } = req.params;
  console.log("in save");
  const saveData = req.body;
  fs.writeFile(
    `./data/documents/${documentId}.json`,
    JSON.stringify(saveData, null, 2),
    (err) => {
      if (err) {
        res.status(500).send("Error saving data");
        return;
      }
      res.send("Data saved successfully");
    }
  );
});

app.get("/template/:templateName", (req, res) => {
  const validNames = ["resume", "travel"];
  const { templateName } = req.params;
  if (!validNames.includes(templateName)) {
    res.status(404).send("No such template");
  }

  fs.readFile(`./data/template/${templateName}.json`, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Failed to read a file");
      return;
    }
    res.json(JSON.parse(data));
  });
});

server.listen(5231, () => {
  console.log("Successfully listen to 5231!");
});

const io = new SocketIOSever(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", (documentId) => {
    const data = "";
    socket.join(documentId);
    socket.emit("load-document", data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });
});
