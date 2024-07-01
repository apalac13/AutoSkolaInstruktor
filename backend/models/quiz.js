const mongoose = require("mongoose");
const quizSchema = mongoose.Schema({
  quizname: {
    type: String,
    required: true,
  },
  quizdescription: {
    type: String,
    required: true,
  },
  upload: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("quiz", quizSchema);
