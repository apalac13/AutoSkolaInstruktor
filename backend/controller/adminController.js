const User = require("../models/user");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const QuizResult = require("../models/quizResult");
const TestResult = require("../models/testResult");
const Message = require("../models/message");
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
    await Quiz.deleteOne({ _id: quizId });
    await Question.deleteMany({ quiz: quizId });

    res
      .status(200)
      .json({ msg: "Quiz and associated questions deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

exports.getQuizResults = async (req, res) => {
  try {
    const quizResults = await QuizResult.find().populate("quiz");
    res.status(200).json(quizResults);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizResult = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quizResult = await QuizResult.findById(quizId)
      .populate("quiz")
      .populate("answers.question");
    res.status(200).json(quizResult);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTestResults = async (req, res) => {
  try {
    const testResults = await TestResult.find().populate("test");
    res.status(200).json(testResults);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTestResult = async (req, res) => {
  const testId = req.params.id;
  try {
    const testResult = await TestResult.findById(testId).populate("test");
    res.status(200).json(testResult);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.uploadQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $set: { upload: req.body.upload } },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).send("Quiz doesnt exist");
    }
    if (req.body.upload === false) {
      req.io.emit("quizRemoved", quizId);
    } else {
      req.io.emit("quizUpdated", quiz);
    }
    res.json(quiz);
  } catch (error) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

exports.deleteQuizResult = async (req, res) => {
  const resultId = req.params.id;
  try {
    await QuizResult.findByIdAndDelete(resultId);
    res.status(200).json({ msg: "Result deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
exports.deleteTestResult = async (req, res) => {
  const resultId = req.params.id;
  try {
    await TestResult.findByIdAndDelete(resultId);
    res.status(200).json({ msg: "Result deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

exports.deleteMessages = async (req, res) => {
  try {
    await Message.deleteMany();
    req.io.emit("messagesDeleted");
    res.status(200).json({ msg: "Messages deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
