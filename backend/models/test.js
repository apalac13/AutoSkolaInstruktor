const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    type: [], // Array of strings
    required: true,
  },
  trueAnswers: {
    type: [], // Array of strings, assuming true answers are specified by their text
    required: true,
  },
});

const testSchema = new Schema({
  testName: {
    type: String,
    required: true,
  },
  questions: {
    type: [questionSchema], // Array of question subdocuments
    default: [],
  },
});

module.exports = mongoose.model("Test", testSchema);
