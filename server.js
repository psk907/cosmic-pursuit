const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//Allow requests from all origins
app.use(cors());
// A random key for signing the cookie

module.exports = function (db) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  /// Auth APIs
  app.post("/auth/login", (req, res) =>
    require("./api/auth/login")(req, res, db)
  );

  app.post("/auth/register", (req, res) =>
    require("./api/auth/register")(req, res, db)
  );

  /// Team APIs
  app.get("/teams/getTeams", (req, res) => {
    require("./api/teams/getTeams")(req, res, db);
  });

  app.post("/teams/deleteTeam", (req, res) => {
    require("./api/teams/deleteTeam")(req, res, db);
  });

  /// Clues APIs
  app.get("/clues/getAllClues", (req, res) => {
    require("./api/clues/getAllClues")(req, res, db);
  });
  app.get("/clues/getClue", (req, res) => {
    require("./api/clues/getClue")(req, res, db);
  });
  app.post("/clues/postClue", (req, res) => {
    require("./api/clues/postClue")(req, res, db);
  });
  app.post("/levels/postLevel", (req, res) => {
    require("./api/levels/postLevels")(req, res, db);
  });
  app.post("/clues/validateQRKey", (req, res) => {
    require("./api/clues/validateQRKey")(req, res, db);
  });
  app.post("/clues/submitRiddleAnswer", (req, res) => {
    require("./api/clues/submitRiddleAnswer")(req, res, db);
  });

  app.get("/getGameState", (req, res) => {
    require("./api/getGameState")(req, res, db);
  });

  app.get("/getLeaderboard", (req, res) => {
    require("./api/leaderboard/getLeaderboard")(req, res, db);
  });

  app.listen(PORT, () => {
    console.log(`STARDUST Game Server listening on port ${PORT}`);
  });
};
