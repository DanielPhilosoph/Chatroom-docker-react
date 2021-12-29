// const express = require("express");
const path = require("path");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
const cors = require("cors");
const PORT = 3001;

//? Middleware
app.use(cors());

// //? Static Files
// app.use(express.static("front/build"));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./build/index.html"));
// });

//? Connected users array
let connectedUsers = [];

//? Socket.io Connection
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("onConnect", ({ name, id }) => {
    connectedUsers.push({ id: id, name: name, socketId: socket.id });
    console.log(connectedUsers);
    io.emit("newConnection", {
      id: id,
      name: name,
      time: new Date(),
      connectedUsers: connectedUsers,
    });
  });

  socket.on("message", (info) => {
    io.emit("messageBack", {
      name: info.name,
      id: info.id,
      message: info.message,
      time: new Date(),
    });
  });

  socket.on("privateMessage", (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit("privateMessage", socket.id, msg);
  });

  socket.on("disconnect", () => {
    io.emit(
      "userDisconnect",
      connectedUsers.find((user) => user.socketId === socket.id)
    );
    connectedUsers = connectedUsers.filter(
      (user) => user.socketId !== socket.id
    );
    console.log("disconnect");
  });
});

//? Routers

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
