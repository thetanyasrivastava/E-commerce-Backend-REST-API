const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.POSTGRES_URI);
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;