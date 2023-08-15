const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 8000;
app.use(express.static("statics"));
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["Get", "POST"],
  },
});

const users = []

app.get("/userinfo", (req, res) => {
  res.send("taha");
});

io.on("connection", (socket) => {
  console.log("a user connected => ", socket.id);
  socket.on("login", (data) => {
    // socket.broadcast.emit("login", data);
    users.push({
      username: data,
      userid: socket.id
    })
  });
  socket.on("send_message", (data) => {
    socket.broadcast.emit("recive_message", data);
  });
});

server.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
