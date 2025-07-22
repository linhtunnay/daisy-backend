const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

let userCounter = 1912002;
const users = {};

io.on("connection", (socket) => {
  let assignedId = userCounter++;
  users[socket.id] = assignedId;
  socket.emit("your-id", assignedId);

  socket.on("send-message", ({ to, message }) => {
    for (let id in users) {
      if (users[id] === to) {
        io.to(id).emit("receive-message", {
          from: users[socket.id],
          message
        });
        break;
      }
    }
    setTimeout(() => {
      socket.emit("delete-message");
    }, 20000); // 20 seconds auto delete
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server running on port", port);
});