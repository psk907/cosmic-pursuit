/// This function is used by the admin to add/edit a clue.
module.exports = async function (req, res, db) {
  try {
    /** POST
     *  Required params
     *  clueId: The id of the clue.
     *  body : The html body of the clue.
     */
    let params = ["title", "clueId", "body", "level"];
    console.log(req.body);
    for (let param of params) {
      if (req.body[param] !== 0 && !req.body[param]) {
        res.status(400).send("Missing parameter in request body: " + param);
        return;
      }
    }
    let clue = {
      title: req.body.title,
      clueId: req.body.clueId,
      body: req.body.body,
      level: req.body.level,
    };
    let result = await db.collection("clues").insertOne(clue);
    res.status(200).send("Successfully updated/added clue.");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
