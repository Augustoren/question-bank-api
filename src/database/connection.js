const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/question_bank")
  .then(() => console.warn("Connected to DB!"))
  .catch((err) => {
    console.error("Connection to DB failed! -> ", err.message);
    process.exit(1);
  });

module.exports = mongoose;
