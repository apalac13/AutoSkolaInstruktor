const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3003;

const eNastavaRoutes = require("./routes/eNastava");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDb = require("./database/db");
connectDb();

// Socket
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.set("io", io);
io.on("connection", (socket) => {
  console.log("new socket connection...");
  socket.emit("test event", "hey Ana");
});

app.use("/e-nastava", eNastavaRoutes);

app.get("/", (req, res) => {
  res.send("Pozdrav od Express poslužitelja!");
});

app.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});
