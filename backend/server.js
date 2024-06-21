const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PORT = 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Spajanje na bazu
mongoose.connect("mongodb://127.0.0.1:27017/autoskolaBaza", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Instanca konekcije na bazu
const db = mongoose.connection;

// Upravljanje događajima
db.on("error", (error) => {
  console.error("Greška pri spajanju:", error);
});
db.once("open", function () {
  console.log("Spojeni smo na MongoDB bazu");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Dogodila se pogreška!");
});

app.get("/", (req, res) => {
  res.send("Pozdrav od Express poslužitelja!");
});

app.get("/ruta", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

app.get("/async-ruta", async (req, res, next) => {
  try {
    await asinkronaFunkcija();
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});
