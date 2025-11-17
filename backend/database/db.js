const mongoose = require("mongoose");

function connectDb() {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connected to MongoDB");
    })
    .catch((err) => {
      console.error("Database connection error: ", err);
    });
}

module.exports = connectDb;
