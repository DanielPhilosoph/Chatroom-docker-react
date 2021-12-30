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
  // ? Allows to send private messages
  socket.join(socket.id);

  socket.on("onConnect", ({ name, id }) => {
    const user = connectedUsers.find((user) => user.id === id);
    // ? If did find any connected user with the same id, so add
    if (!user) {
      connectedUsers.push({ id: id, name: name, socketId: socket.id });
    } else {
      // ? Else update socket id
      connectedUsers.map((user) => {
        if (user.id === id) {
          user.socketId = socket.id;
        }
      });
    }
    io.emit("newConnection", {
      id: id,
      name: name,
      time: new Date().toString(),
      connectedUsers: connectedUsers,
    });
  });

  socket.on("message", (info) => {
    console.log(socket.id);
    io.emit("messageBack", {
      name: info.name,
      id: info.id,
      message: info.message,
      time: new Date().toString(),
    });
  });

  socket.on("privateMessage", (anotherSocketId, info) => {
    console.log("you send a private message to ", anotherSocketId);
    socket.to(anotherSocketId).emit("privateMessage", {
      from: socket.id,
      to: anotherSocketId,
      name: info.name,
      id: info.id,
      message: info.message,
      time: new Date().toString(),
    });
  });

  socket.on("disconnect", () => {
    const disconnectedUser = connectedUsers.find(
      (user) => user.socketId === socket.id
    ) || { name: "someone", id: "fallback", socketId: "socketId_fallback" };
    disconnectedUser.time = new Date().toString();
    io.emit("userDisconnect", disconnectedUser);
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
