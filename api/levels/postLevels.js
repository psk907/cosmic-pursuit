/// This function is used by the admin to add/edit a clue.
module.exports = async function (req, res, db) {
  try {
    /** POST
     *  Required params
     *  clueId: The id of the clue.
     *  body : The html body of the clue.
     */
    let params = [
      "level",
      "clues",
      "locationPoints",
      "riddlePoints",
      "scanKeys",
      "riddles",
    ];
    console.log(req.body);
    for (let param of params) {
      if (!req.body[param] && req.body[param] !== 0) {
        res.status(400).send("Missing parameter in request body: " + param);
        return;
      }
    }
    let level = {
      level: req.body.level,
      clues: req.body.clues,
      locationPoints: req.body.locationPoints,
      riddlePoints: req.body.riddlePoints,
      scanKeys: req.body.scanKeys,
      riddles: req.body.riddles,
    };
    let result = await db.collection("levels").insertOne(level);
    res.status(200).send("Successfully updated/added level.");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
