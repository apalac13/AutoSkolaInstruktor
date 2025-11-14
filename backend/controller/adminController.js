const User = require("../models/user");
const Quiz = require("../models/quiz");
const QuizResult = require("../models/quizResult");
const TestResult = require("../models/testResult");
const jwt = require("jsonwebtoken");

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
  const quiz = new Quiz({
    quizname: req.body.name,
    quizdescription: req.body.description,
  });

  try {
    const savedQuiz = await quiz.save();
    res.status(200).json(savedQuiz);
  } catch (error) {
    console.log("Error saving quiz:", error);
    res.status(500).json({ message: "Greška prilikom spremanju kviza." });
  }
};

exports.addQuestion = async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Kviz ne postoji" });
    }

    let answerOptions = [];
    if (req.body.answerOptions) {
      answerOptions = JSON.parse(req.body.answerOptions);
    }

    const newQuestion = {
      questionText: req.body.questionText,
      image: req.file ? req.file.originalname : null,
      questionNumber: quiz.questions.length + 1,
      type: req.body.type,
      answerOptions,
    };

    quiz.questions.push(newQuestion);
    await quiz.save();

    return res.status(200).json({ message: "Pitanje uspješno dodano!" });
  } catch (error) {
    console.error("Greška pri dodavanju pitanja:", error);
    res.status(500).json({ message: "Greška pri dodavanju pitanja" });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { kvizId, questionId } = req.params;

  try {
    const quiz = await Quiz.findById(kvizId);
    if (!quiz) {
      return res.status(404).json({ message: "Kviz nije pronađen" });
    }

    const question = quiz.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Pitanje nije pronađeno" });
    }

    question.deleteOne();
    quiz.questions.forEach((q, index) => {
      q.questionNumber = index + 1;
    });
    await quiz.save();

    res.json({ message: "Pitanje uspješno izbrisano" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Pojavila se greška prilikom brisanja pitanja",
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Kviz nije pronađen!" });
    }

    res.status(200).json({ message: "Kviz uspješno izbrisan!" });
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom brisanja kviza!" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ role: "user" });
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Greška pri dohvaćanju korisnika" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Korisnik s ovim korisnickim imenom već postoji!" });
    }
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      role: req.body.username === "asinstruktor1990" ? "admin" : "user",
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Pojavila se greška prilikom registracije!" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "Korinsik nije pronađen" });
    }
    res.status(200).json({ message: "Korisnik uspješno izbrisan!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška prilikom brisanja korisnika" });
  }
};

exports.getQuizResults = async (req, res) => {
  try {
    const quizResults = await QuizResult.find().populate("quiz");
    res.status(200).json(quizResults);
  } catch (error) {
    res.status(500).json({ message: "Greška prilikom dohvaćanja rezultata" });
  }
};

exports.getQuizResult = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quizResult = await QuizResult.findById(quizId).populate("quiz");
    res.status(200).json(quizResult);
  } catch (error) {
    res.status(500).json({ message: "Greška prilikom dohvaćanja rezultata" });
  }
};

exports.getTestResults = async (req, res) => {
  try {
    const testResults = await TestResult.find().populate("test");
    res.status(200).json(testResults);
  } catch (error) {
    res.status(500).json({ message: "Greška prilikom dohvaćanja rezultata" });
  }
};

exports.getTestResult = async (req, res) => {
  const testId = req.params.id;
  try {
    const testResult = await TestResult.findById(testId).populate("test");
    res.status(200).json(testResult);
  } catch (error) {
    res.status(500).json({ message: "Greška prilikom dohvaćanja rezultata" });
  }
};

exports.deleteQuizResult = async (req, res) => {
  const resultId = req.params.id;
  try {
    const deletedResult = await QuizResult.findByIdAndDelete(resultId);
    if (!deletedResult) {
      return res.status(404).json({ message: "Rezultat nije pronađen" });
    }
    res.status(200).json({ message: "Rezultat uspješno izbrisan!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška prilikom brisanja rezultata" });
  }
};

exports.deleteTestResult = async (req, res) => {
  const resultId = req.params.id;
  try {
    const deletedResult = await TestResult.findByIdAndDelete(resultId);
    if (!deletedResult) {
      return res.status(404).json({ message: "Rezultat nije pronađen" });
    }
    res.status(200).json({ message: "Rezultat uspješno izbrisan!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška prilikom brisanja rezultata" });
  }
};
