require("dotenv").config();
const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;

// establish a connection to mongo db
mongoose.connect(DATABASE_URL);

// logs for connections (on open, on close, on error)
mongoose.connection
    .on("open", () => console.log("connected to mongoose"))
    .on("close", () => console.log("disconnected from mongoose"))
    .on("error", (error) => console.log(error));

module.exports = mongoose;


