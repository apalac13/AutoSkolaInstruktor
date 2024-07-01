const User = require("../models/user");
const Quiz = require("../models/quiz");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    console.log("Authorization header missing");
    return res.status(403).send("Ne postoji autorizacijasko zaglavlje");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Bearer token missing");
    return res.status(403).send("Bearer token nije pronađen");
  }

  try {
    const dekodiraniToken = jwt.verify(token, "tajniKljuc");
    req.user = dekodiraniToken;
    next();
  } catch (error) {
    console.log("Invalid token:", error);
    return res.status(401).send("Neispravni Token");
  }
};

exports.createQuiz = async (req, res) => {
  if (!req.body.name || !req.body.description) {
    console.log("Missing name or description");
    return res.status(400).json({ msg: "Name and description are required." });
  }

  const quiz = new Quiz({
    quizname: req.body.name,
    quizdescription: req.body.description,
  });

  try {
    const savedQuiz = await quiz.save();
    console.log("Quiz saved successfully:", savedQuiz);
    res.status(200).json({ message: "Quiz added successfully!" });
  } catch (error) {
    console.log("Error saving quiz:", error);
    res.status(500).json({ msg: "Error saving quiz." });
  }
};
