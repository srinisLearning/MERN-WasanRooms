const mongoose = require("mongoose");
require("dotenv").config();
//const mongoUrl =   "mongodb+srv://wasan:abdc4213@cluster0.vwd2bmc.mongodb.net/WasanHotels";
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);
const connection = mongoose.connection;
connection.on("open", () => {
  console.log("Connected to MongoDB");
});
connection.on("error", (err) => {
  console.log("Error", err);
});
module.exports = mongoose;
