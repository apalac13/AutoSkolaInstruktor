const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
  questionText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  answer: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Question", questionSchema);
