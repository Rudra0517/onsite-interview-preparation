const mongoose = require("mongoose");

const connectDB = async () => {
  const url = process.env.MONGODB_URL;
  try {
    await mongoose.connect(url);
    console.log("DB connected...");
  } catch (error) {
    console.log("Failed to connect");
  }
};

module.exports = connectDB;
