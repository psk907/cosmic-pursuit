// This method is called when the team reaches a location using the clue and scans the QR code.
module.exports = async function validateQRKey(req, res, db) {
       /** POST
         *  Required params
         *  clueId: The id of the clue.
         *  teamId: The id of the team.
         *  scanKey: The QR Code that the team scanned.
         */

        let params = ["clueId", "teamId", "scanKey"];
        for(let param of params){
            if(!req.body[param]){
                res.status(400).send("Missing parameter in request body: " + param);
                return;
            }
        }
        let clueId = req.body.clueId;
        let teamId = req.body.teamId;
        let scanKey = req.body.scanKey;
        
        let clue = await db.collection("clues").findOne({clueId: clueId});
        if(!clue){
            res.status(400).send("Invalid clueId");
            return;
        }
        let team = await db.collection("teams").findOne({teamId: teamId});
        if(!team){
            res.status(400).send("Invalid teamId");
            return;
        }
        let clueLvl = clue.level;

}