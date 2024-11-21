const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const cors = require("cors");
const PORT = 3003;

const eNastavaRoutes = require("./routes/eNastava");
const guestRoutes = require("./routes/guest");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDb = require("./database/db");
connectDb();

// Socket
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/e-nastava", eNastavaRoutes);
app.use("/", guestRoutes);

app.get("/", (req, res) => {
  res.send("Pozdrav od Express poslužitelja!");
});

server.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});
