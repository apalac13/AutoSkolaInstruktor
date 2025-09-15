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

const questionSchema = new Schema(
  {
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
      required: true,
    },
  },
  { timestamps: true }
);

const testSchema = new Schema({
  testName: {
    type: String,
    required: true,
  },
  totalPoints: {
    type: Number,
    required: true,
  },
  questions: {
    type: [questionSchema],
    default: [],
  },
});

module.exports = mongoose.model("Test", testSchema);
