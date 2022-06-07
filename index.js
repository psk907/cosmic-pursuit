require("dotenv").config();
var mongoClient = require("mongodb").MongoClient;
mongoClient.connect(process.env.MONGO_CONNECTION_URL, function (err, client) {
  console.log(err)
  console.log("Connected successfully to database");
  let db = client.db('lostinspace');
  require("./server")(db);
  
});