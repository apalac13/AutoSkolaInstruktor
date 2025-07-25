const mongoose = require("mongoose");

function connectDb() {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(
      "mongodb+srv://anabradaric77:ana123321@cluster0.4jvd4gc.mongodb.net/asinstruktor"
    )
    .then(() => {
      console.log("Database connected to MongoDB");
    })
    .catch((err) => {
      console.error("Database connection error: ", err);
    });
}

module.exports = connectDb;
