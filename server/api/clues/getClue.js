module.exports = async function (req, res, db) {
      /** GET
         *  Required query params
         *  clueid: The id of the clue.
         *  teamid: The id of the team accessing the clue.
         */
       let params = ["clueid", "teamid"];
       console.log(req.body)
       for(let param of params){
           if(!req.body[param]){
               res.status(400).send("Missing parameter in query params: " + param);
               return;
           }
       }
    try {
        let clues = await db.collection("clues").find({clueid:req.query.clueid}).toArray();
        if(clues.length == 0){
            res.status(404).send("Clue not found.");
            return;
        }
        clue = clues[0];
        /// Check if this clue is allowed to be accessed by this team.

        res.status(200).json(clue);
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
