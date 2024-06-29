const mongoose = require("mongoose");

function connectDb() {
  mongoose.Promise = global.Promise;
  mongoose
    .connect("mongodb://127.0.0.1:27017/autoskolaBaza")
    .then(() => {
      console.log("Database connected to Mongo ");
    })
    .catch((err) => {
      console.error("Database connection error: ", err);
    });
}

module.exports = connectDb;
