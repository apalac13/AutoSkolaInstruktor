const User = require("../models/user");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const Result = require("../models/result");
const Message = require("../models/message");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const quiz = require("../models/quiz");

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

exports.getAllQuizes = async (req, res) => {
  try {
    const allQuizes = await Quiz.find().populate("questions");
    res.json(allQuizes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find().populate("quiz");
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.addQuestion = async (req, res) => {
  const quizId = req.params.id;
  const newQuestion = new Question({
    quiz: quizId,
    questionText: req.body.questionText,
    image: req.file ? req.file.originalname : null,
    answer: req.body.answer,
    options: JSON.parse(req.body.options),
  });

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz doesn't exist" });
    }

    const savedQuestion = await newQuestion.save();

    quiz.questions.push(savedQuestion._id);
    await quiz.save();

    return res.status(200).json({
      message: "Question added successfully!",
      question: savedQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { kvizId, questionId } = req.params;
  try {
    const quiz = await Quiz.findById(kvizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const questionIndex = quiz.questions.indexOf(questionId);
    if (questionIndex > -1) {
      quiz.questions.splice(questionIndex, 1);
      await quiz.save();
    }

    await Question.findByIdAndDelete(questionId);

    res.json({ msg: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Server error" });
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

exports.deleteResult = async (req, res) => {
  const resultId = req.params.id;
  try {
    await Result.findByIdAndDelete(resultId);
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
