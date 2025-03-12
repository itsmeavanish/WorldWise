const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  const uri = "mongodb+srv://avanishupadhyay633:2jqrvQmQwiOgLslp@cluster0.c80t1.mongodb.net/Worldwise?retryWrites=true&w=majority&appName=Cluster0"; // Ensure this is defined
  if (!uri) {
    throw new Error("MongoDB URI is not defined");
  }
  try {
    await mongoose.connect(uri);
    console.log("DB Connection Successful");
  } catch (error) {
    console.error("DB Connection Issues:");
    console.error(error);
    throw error; // Rethrow the error to handle it upstream if needed
  }
};
