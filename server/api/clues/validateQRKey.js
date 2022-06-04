async function unlockRiddle(team,locationPoints,clueId,scanKey,db,res){
    try{
        /// Unlocks riddle by adding crackedClueTimestamp and setting crackedClue to true for a team.
        let unlockedClue = team.unlockedClues.find(r => r.clueId == clueId);
        if(unlockedClue && unlockedClue.crackedClue===false){
            unlockedClue.crackedClue = true;
            unlockedClue.crackedClueTimestamp = new Date();
            unlockedClue.scanKey = scanKey;
            unlockedClue.score+=locationPoints;
            await db.collection("teams").updateOne({uid: team.uid}, {$set: team});
            res.status(200).send("Riddle unlocked successfully");
        }
        else{
            res.status(201).send("Riddle already unlocked");
        }
    }
    catch(err){
        console.log(err)
        return false;
    }
}

// This method is called when the team reaches a location using the clue and scans the QR code.
module.exports = async function validateQRKey(req, res, db) {
       /** POST
         *  Required params
         *  clueId: The id of the clue.
         *  uid: The id of the team.
         *  scanKey: The QR Code that the team scanned.
         */

        let params = ["clueId", "uid", "scanKey"];
        for(let param of params){
            if(!req.body[param]){
                res.status(400).send("Missing parameter in request body: " + param);
                return;
            }
        }
        let clueId = req.body.clueId;
        let uid = req.body.uid;
        let scanKey = req.body.scanKey;
        
        let clue = await db.collection("clues").findOne({clueId: clueId});
        let team = await db.collection("teams").findOne({uid: uid});
        let levels = await db.collection("levels").find({}).toArray();
        
        if(!clue){
            res.status(400).send("Invalid clueId");
            return;
        }
        if(!team){
            res.status(400).send("Invalid uid");
            return;
        }
        let clueLvl = clue.level;
        let level = levels.find(r => r.level == clueLvl);
        if(!level.clues || !Array.isArray(level.clues) || !level.clues.includes(clueId)){
            res.status(400).send("Invalid clueId, not in level");
            return;
        }

        let scanKeys = level.scanKeys;
        if(!scanKeys || !Array.isArray(scanKeys) || !scanKeys.includes(scanKey)){
            res.status(400).send("Invalid scanKey, not in level");
            return;
        }
        let riddle = level.riddles.find(riddle => riddle.scanKey == scanKey);
        let locationPoints = level.locationPoints;
        await unlockRiddle(team,locationPoints,clueId,scanKey,db,res);
}