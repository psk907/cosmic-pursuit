const { v4: uuidv4 } = require("uuid");

module.exports = async function register(req, res, db) {
  try {
    // if (!req.body)
    //   return res.status(400).json({
    //     message: `Body with team details expected`,
    //   });
    for (let key of ["teamName", "teamNo", "password"])
      if (!req.body[key])
        return res.status(400).json({
          message: `${key} is required.`,
        });

    let password = req.body.password;
    let teamName = req.body.teamName;
    let teamNo = parseInt(req.body.teamNo);

    if (!teamNo)
      return res.status(400).json({ message: "teamNo must be an integer" });

    let uid = uuidv4();

    let teamData = {
      teamName: teamName,
      teamNo: teamNo,
      password: password,
      uid: uid,
      score: 0.0,
      unlockedClues: [],
    };

    let result = await db.collection("teams").insertOne(teamData);

    return res.status(201).json({ ...result, message: "Team added" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
