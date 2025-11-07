const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3003;

const eNastavaRoutes = require("./routes/eNastava");
const guestRoutes = require("./routes/guest");
const connectDb = require("./database/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/e-nastava", eNastavaRoutes);
app.use("/", guestRoutes);

app.get("/", (req, res) => {
  res.send("Pozdrav od Express poslužitelja!");
});

app.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});
