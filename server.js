const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Socket } = require("socket.io-client");
const ACTIONS = require("./src/Actions");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (Socket) => {
  console.log("Socket connected ", Socket.id);

  Socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[Socket.id] = username;
    console.log(userSocketMap);
    Socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log(clients);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
