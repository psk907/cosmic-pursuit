require("dotenv").config();
var mongoClient = require("mongodb").MongoClient;
const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;
mongoClient.connect(MONGO_CONNECTION_URL, function (err, client) {
  if (err) console.log(err);
  else console.log("Connected successfully to database");
  let db = client.db("lostinspace");
  require("./server")(db);
});
