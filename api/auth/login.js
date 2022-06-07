module.exports = async function login(req, res, db) {
  try {
    for (let key of ["teamNo", "password"]) {
      if (!req.body[key])
        return res.status(400).json({
          message: `${key} is required`,
        });
    }
    let teamNo = req.body.teamNo;
    let password = req.body.password;
    let teamData = await db.collection("teams").findOne({ teamNo: teamNo });
    if (!teamData)
      return res.status(404).json({
        message: `There is no team with Team ID: ${teamNo}`,
      });
    if (teamData.password !== password)
      return res.status(401).json({
        message: "Incorrect password entered",
      });
    console.log(teamData);
    return res.json({
      uid: teamData.uid,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
