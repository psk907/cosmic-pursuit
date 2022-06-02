const { v4: uuidv4 } = require("uuid");

module.exports = async function deleteTeam(req, res, db) {
  try {
    for (let key of ["teamNo"])
      if (!req.body[key])
        return res.status(400).json({
          message: `${key} is required.`,
        });

    let teamNo = parseInt(req.body.teamNo);

    if (!teamNo)
      return res.status(400).json({ message: "teamNo must be an integer" });

    let result = await db.collection("teams").deleteOne({ teamNo: teamNo });

    return res
      .status(200)
      .json({ ...result, message: `Team ${teamNo} removed` });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
