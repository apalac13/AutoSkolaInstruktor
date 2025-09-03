const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    answers: [
      {
        question: { type: Schema.Types.ObjectId, ref: "Question" },
        selectedOption: { type: String, default: "" },
        correctAnswer: { type: String },
      },
    ],
    result: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizResult", QuizResultSchema);
