function checkIfClueAccessIsAllowed(teamId, clueId, teamObj,clueObj){

  
}
module.exports = async function (req, res, db) {
      /** GET
         *  Required query params
         *  clueId: The id of the clue.
         *  teamId: The id of the team accessing the clue.
         */
       let params = ["clueId", "teamId"];
       console.log(req.body)
       for(let param of params){
           if(!req.query[param]){
               res.status(400).send("Missing parameter in query params: " + param);
               return;
           }
       }
    try {
        let clue = await db.collection("clues").findOne({clueId:req.query.clueId});

        if(clue == null){
            res.status(404).send("Clue not found.");
            return;
        }
        /// Check if this clue is allowed to be accessed by this team.
        let team = await db.collection("teams").findOne({teamId: req.query.teamId});
        if(team==null){
            res.status(404).send("Team not found.");
            return;
        }

        let isAccessAllowed = checkIfClueAccessIsAllowed(req.query.teamId, req.query.clueId,clue,team);

        if(!isAccessAllowed){
            res.status(403).send("You are not allowed to access this clue.");
            return;
        }
        res.status(200).json(clue);
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
