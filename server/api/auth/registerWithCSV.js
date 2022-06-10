const { v4: uuidv4 } = require("uuid");

async function register(req, db) {
  try {
    // if (!req.body)
    //   return res.status(400).json({
    //     message: `Body with team details expected`,
    //   });
    for (let key of ["teamName", "teamNo", "password"])
      if (!req.body[key])
        return console.log({
          message: `${key} is required.`,
        });

    let password = req.body.password;
    let teamName = req.body.teamName;
    let teamNo = parseInt(req.body.teamNo);

    if (!teamNo)
      return res.status(400).json({ message: "teamNo must be an integer" });

    let uid = uuidv4();
    let exists = await db.collection("teams").findOne({ teamNo: teamNo });
    if (exists) {
      return console.log({ message: "Team already exists" });
    }
    let teamData = {
      teamName: teamName,
      teamNo: teamNo,
      password: password,
      uid: uid,
      score: 0.0,
      unlockedClues: [
        {
          clueId: "cid01",
          level: 0,
          isUnlocked: true,
          crackedClue: false,
          crackedRiddle: false,
          score: 0.0,
        },
      ],
    };

    let result = await db.collection("teams").insertOne(teamData);

    return console.log({ ...result, message: "Team added" });
  } catch (err) {
    console.log(err);
  }
}

module.exports = async function (req, res, db) {
  // teamNo, teamName and password
  let csv = require("csvtojson");
  csv()
    .fromFile(__dirname + "/sample.csv")
    .then(async function (jsonObj) {
      console.log(jsonObj);
      console.log(req.body);
      for (let team of jsonObj) {
        req.body = team;
        await register(req, db);
      }
    });
};
