const User = require("../models/user");
const Quiz = require("../models/quiz");
const QuizResult = require("../models/quizResult");
const TestResult = require("../models/testResult");
const jwt = require("jsonwebtoken");

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

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && req.body.password === user.password) {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
        },
        "tajniKljuc",
        { expiresIn: "3h" }
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
    const { username, newPassword } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { password: newPassword },
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

exports.getAllQuizes = async (req, res) => {
  try {
    const allQuizes = await Quiz.find();
    res.json(allQuizes);
  } catch (error) {
    res.status(500).json({ message: "Greška pri dohvaćanju kviza" });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Greška pri dohvaćanju kviza" });
  }
};

exports.saveQuizResult = async (req, res) => {
  const result = new QuizResult({
    quiz: req.body.quiz,
    name: req.body.name,
    username: req.body.username,
    result: req.body.result,
    answers: req.body.answers,
  });

  try {
    const savedResult = await result.save();
    res.status(200).json({ message: "Rezultati uspješno spremljeni" });
  } catch (error) {
    res.status(500).json({ message: "Greška pri spremanju rezultata kviza." });
  }
};

exports.saveTestResult = async (req, res) => {
  const testResult = new TestResult({
    test: req.body.test,
    name: req.body.name,
    username: req.body.username,
    points: req.body.points,
    totalPoints: req.body.totalPoints,
    result: req.body.result,
    answers: req.body.answers,
  });

  try {
    const savedTestResult = await testResult.save();
    res.status(200).json({ message: "Rezultati uspješno spremljeni" });
  } catch (error) {
    res.status(500).json({ message: "Greška pri spremanju rezultata testa." });
  }
};
