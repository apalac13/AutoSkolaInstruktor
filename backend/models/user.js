const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Uncomment these methods if needed
// userSchema.statics.hashPassword = function hashPassword(password) {
//   return bcrypt.hashSync(password, 10);
// };

// userSchema.methods.isValid = function (hashedpassword) {
//   return bcrypt.compareSync(hashedpassword, this.password);
// };

module.exports = mongoose.model("User", userSchema);
