const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = 3001;

//? Middleware
app.use(cors());

// //? Static Files
// app.use(express.static("client/build"));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../front/public/index.html"));
// });

//? Socket.io Connection
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("onConnect", ({ name }) => {
    io.emit("newConnection", { name: name, time: new Date() });
  });

  socket.on("message", (info) => {
    io.emit("messageBack", {
      name: info.name,
      message: info.message,
      time: new Date(),
    });
  });

  socket.on("disconnect", () => {
    // io.emit("userDisconnect", {  });
    console.log("disconnect");
  });
});

//? Routers

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
