const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
  user: {
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
});

module.exports = mongoose.model("Result", resultSchema);
