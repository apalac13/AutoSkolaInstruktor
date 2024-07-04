const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
  questionText: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Question", questionSchema);
