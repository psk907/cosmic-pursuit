const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

module.exports = function (db) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.get("/teams/getTeams", (req, res) => {
    require("./api/teams/getTeams")(req, res, db);
  });

  app.post("/teams/deleteTeam", (req, res) => {
    require("./api/teams/deleteTeam")(req, res, db);
  });

  app.post("/auth/login", (req, res) =>
    require("./api/auth/login")(req, res, db)
  );

  app.post("/auth/register", (req, res) =>
    require("./api/auth/register")(req, res, db)
  );

  app.listen(PORT, () => {
    console.log(`STARDUST Game Server listening on port ${PORT}`);
  });
};
