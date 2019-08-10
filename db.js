
const mongoose = require("mongoose");
const db = mongoose.connection;

let url = "mongodb://localhost/server-api";

mongoose.connect(url);
mongoose.connect(url, { useNewUrlParser: true });

db.on("error", console.error.bind(console, "connect error") );
db.once("open", () =>  console.log("mongoose opened!"));


