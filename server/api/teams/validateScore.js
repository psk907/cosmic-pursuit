module.exports = async function (uid, db) {
  if (!uid || !db || uid.length == 0) {
    return;
  }
  let finalScore = 0;
  let team = await db.collection("teams").findOne({ uid: uid });
  if (team == null) {
    console.log("team not found")
    return 0;
  }
  let unlockedClues = team.unlockedClues;
  for (let clue of unlockedClues) {
    finalScore += clue.score;
  }
  console.log(finalScore);
  await db
    .collection("teams")
    .updateOne({ uid: uid }, { $set: { score: finalScore } });
  return finalScore;
};
