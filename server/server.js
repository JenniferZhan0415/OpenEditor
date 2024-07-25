import express from "express";
import { createServer } from "http";
import { Server as SocketIOSever } from "socket.io";

const app = express();

const server = createServer(app);

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
