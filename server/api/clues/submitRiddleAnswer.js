/// This function is used by the team to submit an answer to advance to the next clue(level)
module.exports = async function submitAnswer(req, res, db) {
  /**
   *  Required params
   *  clueId: The id of the clue.
   *  uid: The id of the team.
   *  answer : The answer submitted by the team to the riddle.
   */
  console.log(req.body);
  let params = ["clueId", "uid", "answer"];
  for (let param of params) {
    if (!req.body[param]) {
      res
        .status(400)
        .json({ message: "Missing parameter in request body: " + param });
      return;
    }
  }
  let uid = req.body.uid;
  let clueId = req.body.clueId;
  let answer = req.body.answer.trim();

  let team = await db.collection("teams").findOne({ uid: uid });
  if (team == null) {
    res.status(404).json({ message: "Team not found." });
    return;
  }

  /// check if clueid is present in the team's unlockedClues

  let clueObj = team.unlockedClues.find((clue) => clue.clueId == clueId);
  if (
    !clueObj ||
    clueObj.crackedClue === false ||
    clueObj.crackedClue === undefined ||
    !clueObj.scanKey
  ) {
    return res
      .status(403)
      .json({ message: "You have not unlocked this clue yet." });
  }
  if (clueObj.crackedRiddle === true) {
    return res
      .status(403)
      .json({ message: "You have already solved this riddle." });
    return;
  }

  let levels = await db.collection("levels").find({}).toArray();
  let level = levels.find((level) => level["clues"].includes(clueId));
  if (!level) {
    return res.status(404).json({ message: "Invalid clue , Level not found." });
  }
  let riddle = level.riddles.find((r) => r["scanKey"] === clueObj.scanKey);
  if (!riddle) {
    return res
      .status(404)
      .json({ message: "Invalid ScanKey , Riddle not found." });
  }

  if (clueObj.crackedClue === true && riddle.answer.trim() === answer) {
    clueObj.crackedRiddle = true;
    clueObj.crackedRiddleTimeStamp = new Date();
    clueObj.score += level.riddlePoints;
    team.score += level.riddlePoints;
    team.lastSubmissionTimeStamp = new Date();
    let followclueId = riddle.followclueId;
    if (followclueId !== "") {
      team.unlockedClues.push({
        clueId: followclueId,
        level: clueObj.level + 1,
        isUnlocked: true,
        crackedClue: false,
        crackedRiddle: false,
        score: 0.0,
      });
      await db.collection("teams").updateOne({ uid: uid }, { $set: team });
      res.status(200).json({
        message: "Riddle Solved! You can now advance to the next clue.",
      });
    } else {
      await db.collection("teams").updateOne({ uid: uid }, { $set: team });
      res.status(200).json({
        message: "Congratulations! You have successfully solved all riddles.",
      });
    }
  } else {
    res.status(403).json({ message: "Wrong Answer." });
  }
};
