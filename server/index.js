require("dotenv").config();


var mongoClient = require("mongodb").MongoClient;
mongoClient.connect(require("./connectionurl"), function (err, client) {
  console.log(err)
  console.log("Connected successfully to database");
  let db = client.db('lostinspace');
  require("./server")(db);
  
});