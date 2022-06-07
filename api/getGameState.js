const { v4: uuidv4 } = require("uuid");
/**
 * Used to access the current game state for a particular team
 *
 * Requires an `uid` to be passed as header with the request
 *
 * Returns all the data needed to be shown to the user on the webpage
 */
module.exports = async function getGameState(req, res, db) {
  try {
    let uid = req.header("uid");
    if (!uid)
      return res.status(401).json({
        message: `Unauthorized ! Please login and try again.`,
      });
    await require("./teams/validateScore")(uid, db);
    let teamData = await db.collection("teams").findOne({ uid: uid });
    let clues = await db.collection("clues").find().toArray();

    if (!teamData)
      return res.status(404).json({
        message: "Couldn't find your team's data. Contact the organizers.",
      });

    for (let i = 0; i < teamData["unlockedClues"].length; i++) {
      let clueData = clues.find((val, index, arr) => {
        return val["clueId"] === teamData["unlockedClues"][i]["clueId"];
      });

      teamData["unlockedClues"][i] = {
        ...teamData["unlockedClues"][i],
        ...clueData,
      };
      //   console.log(clueData);

      // Clean the response
      delete teamData["unlockedClues"][i]._id;
      delete teamData.password;
    }

    return res.status(200).json(teamData);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
