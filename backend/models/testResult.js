const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testResultSchema = new Schema(
  {
    test: { type: Schema.Types.ObjectId, ref: "Test" },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
      required: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
      required: true,
    },
    result: {
      type: Number,
      default: 0,
      required: true,
    },
    answers: [
      {
        questionNumber: { type: Number, required: true },
        answers: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestResult", testResultSchema);
