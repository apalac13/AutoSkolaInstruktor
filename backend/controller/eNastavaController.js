const User = require("../models/user");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const QuizResult = require("../models/quizResult");
const Message = require("../models/message");
const TestResult = require("../models/testResult");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const quiz = require("../models/quiz");

const saltRunde = 10;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).send("Ne postoji autorizacijasko zaglavlje");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).send("Bearer token nije pronađen");

  try {
    const dekodiraniToken = jwt.verify(token, "tajniKljuc");
    req.user = dekodiraniToken;
  } catch (error) {
    return res.status(401).send("Neispravni Token");
  }
  next();
};

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Korisnik s ovim mailom već postoji!" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, saltRunde);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.email === "jure@gmail.com" ? "admin" : "user",
    });
    await user.save();
    res.status(201).json({ message: "Uspješno ste se registrirali!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Pojavila se greška prilikom registracije!" });
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email, role: user.role },
        "tajniKljuc",
        { expiresIn: "5h" }
      );
      return res.json({ token });
    } else {
      return res.status(401).json({ message: "Neispravni podaci za prijavu" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Pojavila se greška prilikom logiranja!" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, saltRunde);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (user) {
      return res.json({ message: "Lozinka je uspješno promijenjena" });
    } else {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Pojavila se greška prilikom resetiranja lozinke!" });
  }
};

exports.getAllQuestions = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findById(quizId).populate("questions");
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.saveQuizResult = async (req, res) => {
  const result = new QuizResult({
    quiz: req.body.quiz,
    name: req.body.name,
    email: req.body.email,
    answers: req.body.answers,
    result: req.body.result,
  });

  try {
    const savedResult = await result.save();
    console.log("Result saved successfully:", savedResult);
    req.io.emit("resultsUpdated", savedResult);
    res.status(200).json({ message: "Result added successfully!" });
  } catch (error) {
    console.log("Error saving quiz:", error);
    res.status(500).json({ msg: "Error saving quiz." });
  }
};
exports.saveTestResult = async (req, res) => {
  const testResult = new TestResult({
    test: req.body.test,
    name: req.body.name,
    email: req.body.email,
    result: req.body.result,
    answers: req.body.answers,
  });

  try {
    const savedTestResult = await testResult.save();
    console.log("Result saved successfully:", savedTestResult);
    res.status(200).json({ message: "Result added successfully!" });
  } catch (error) {
    console.log("Error saving quiz:", error);
    res.status(500).json({ msg: "Error saving quiz." });
  }
};

exports.saveMessage = async (req, res) => {
  const message = new Message({
    user: req.body.user,
    message: req.body.message,
  });
  try {
    const savedMessage = await message.save();
    console.log("Message saved successfully:", savedMessage);
    req.io.emit("messageSaved", savedMessage);
    res.status(200).json(savedMessage);
  } catch (error) {
    console.log("Error saving message:", error);
    res.status(500).json({ msg: "Error saving message." });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
