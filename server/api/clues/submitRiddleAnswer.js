/// This function is used by the team to submit an answer to advance to the next clue(level)
module.exports = async function submitAnswer(req, res, db) {
    /**
        *  Required params
        *  clueId: The id of the clue.
        *  uid: The id of the team.
        *  answer : The answer submitted by the team to the riddle.
    */

    let params = ["clueId", "uid","answer"];
    for (let param of params) {

        if (!req.body[param]) {
            res.status(400).send("Missing parameter in request body: " + param);
            return;
        }
    }
    let uid = req.body.uid;
    let clueId = req.body.clueId;

    let team = await db.collection("teams").findOne({ uid: uid });
    if (team == null) {
        res.status(404).send("Team not found.");
        return;
    }
    
    /// check if clueid is present in the team's unlockedClues

    let unlockedRiddle = team.unlockedClues.find(riddle => riddle.clueId == clueId);
    if(!unlockedRiddle || unlockedRiddle.crackedClue ===false || unlockedRiddle.crackedClue === undefined || !unlockedRiddle.scanKey){
        res.status(403).send("You have not unlocked this riddle yet.");
        return;
    }
    if(unlockedRiddle.crackedRiddle === true){
        res.status(403).send("You have already solved this riddle.");
        return;
    }
    let levels = await db.collection("levels").find({}).toArray();
    let level = levels.find(level => level['clues'].includes(clueId));
    if (level == null) {
        res.status(404).send("Invalid ClueId , Level not found.");
        return;
    }
    let riddle = level.riddles.find(key => key['scanKey'] == unlockedRiddle.scanKey);
    if (riddle == null) {
        res.status(404).send("Invalid ScanKey , Riddle not found.");
        return;
    }


    if(unlockedRiddle.crackedClue===true  &&  riddle.answer.trim() == req.body.answer.trim()){
        unlockedRiddle.crackedRiddle = true;
        unlockedRiddle.crackedRiddleTimeStamp = new Date();
        unlockedRiddle.score+=level.riddlePoints;
        team.score+=level.riddlePoints;
        let followclueId = riddle.followclueId;
        if(followclueId!==""){
            team.unlockedClues.push({
                clueId: followclueId,
                level: unlockedRiddle.level+1,
                isUnlocked: true,
                crackedClue: false,
                crackedRiddle: false,
                score:0.0
            })
            await db.collection("teams").updateOne({ uid: uid }, { $set: team });
            res.status(200).send("Riddle Solved! You can now advance to the next clue.");
        }
        else{
            await db.collection("teams").updateOne({ uid: uid }, { $set: team });
            res.status(200).send("Congratulations! You have successfully solved all riddles.");
        }
    }
    else{
        res.status(403).send("Wrong Answer.");
    }

};
