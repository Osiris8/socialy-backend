const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb+srv://osiris:osiris@cluster0.z3a2i.mongodb.net/");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
