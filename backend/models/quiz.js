const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  quizname: {
    type: String,
    required: true,
  },
  quizdescription: {
    type: String,
    required: true,
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  upload: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
