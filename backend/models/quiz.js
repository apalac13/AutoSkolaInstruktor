const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionsSchema = new Schema({
  option: {
    type: String,
    default: "",
  },
  answer: {
    type: Boolean,
    default: false,
  },
});

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  questionNumber: {
    type: Number,
    required: true,
  },
  answerOptions: {
    type: [optionsSchema],
    default: [],
  },
});

const quizSchema = new Schema(
  {
    quizname: {
      type: String,
      required: true,
    },
    quizdescription: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
