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

const players = {};

app.get("/login", (req, res) => {
  const name = req.query.username;
  const id = req.query.id;
  let validName = true;
  for (const id in players) {
    if (name === players[id].username) {
      validName = false;
    }
  }
  if (validName) {
    res.json({
      login: true,
    });
  } else {
    res.json({
      login: false,
    });
  }
});

io.on("connection", (socket) => {
  console.log("a user connected => ", socket.id);
  players[socket.id] = {
    id: socket.id,
    position: [10, 0, 20],
  };

  socket.on("send_message", (data) => {
    socket.broadcast.emit("recive_message", data);
  });
});

server.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
