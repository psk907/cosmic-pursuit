require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect(process.env.MONGO_CONNECTION_URL, function (err, client) {
  console.log("Connected successfully to database");
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`STARDUST Game Server listening on port ${PORT}`);
});

