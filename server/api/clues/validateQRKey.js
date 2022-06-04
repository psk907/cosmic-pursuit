async function unlockRiddle(team,locationPoints,clueId,scanKey,db,res){
    try{
        /// Unlocks riddle by adding crackedClueTimestamp and setting crackedClue to true for a team.
        let unlockedClue = team.unlockedClues.find(r => r.clueId == clueId);
        if(unlockedClue && !unlockedClue.crackedClue){
            unlockedClue.crackedClue = true;
            unlockedClue.crackedClueTimestamp = new Date();
            unlockedClue.scanKey = scanKey;
            unlockedClue.score+=locationPoints;
            team.score+=locationPoints;
            await db.collection("teams").updateOne({uid: team.uid}, {$set: team});
            res.status(200).send("Riddle unlocked successfully");
        }
        else{
            if(!unlockedClue){
                res.status(400).send("Clue not unlocked yet");
            }
            else 
            res.status(201).send("Riddle already unlocked");
        }
    }
    catch(err){
        console.log(err)
        return false;
    }
}
async function checkIfClueBelongsToLevel(req,res,db){
    try{

        let clueId = req.body.clueId;
        let uid = req.body.uid;
        let scanKey = req.body.scanKey;
        
        let clue = await db.collection("clues").findOne({clueId: clueId});
        let team = await db.collection("teams").findOne({uid: uid});
        let levels = await db.collection("levels").find({}).toArray();
        
        if(!clue){
            res.status(400).send("Invalid clueId");
            return false;
        }
        if(!team){
            res.status(400).send("Invalid uid");
            return false;
        }

        let level = levels.find(lvl => Array.isArray(lvl.clues) && lvl.clues.includes(clueId));
        if(!level ){
            res.status(400).send("provided clueId not in the same level");
            return false;
        }
        
        let scanKeys = level.scanKeys;
        if(!scanKeys || !Array.isArray(scanKeys) || !scanKeys.includes(scanKey)){
            res.status(400).send("provided scanKey not in the same level");
            return false;
        }
        await unlockRiddle(team,level.locationPoints,clueId,scanKey,db,res);

        return true;
    }
    catch(err){
        res.status(500).send("Internal server error");
        console.log(err);
        return false;
    }
}
    
// This method is called when the team reaches a location using the clue and scans the QR code.
module.exports = async function validateQRKey(req, res, db) {
       /** POST
         *  Required params
         *  clueId: The id of the clue.
         *  uid: The id of the team.
         *  answer: The answer submitted by the team to the clue.
         */

        let params = ["clueId", "uid"];
        for(let param of params){
            if(!req.body[param]){
                res.status(400).send("Missing parameter in request body: " + param);
                return;
            }
        }
       
        await checkIfClueBelongsToLevel(req,res,db);
        
}