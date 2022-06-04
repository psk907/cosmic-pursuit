/// This function is used by the admin to add/edit a clue.
module.exports = async function (req, res, db) {
    try{

        /** POST
         *  Required params
         *  clueId: The id of the clue.
         *  body : The html body of the clue. 
         */
        let params = ["title","clueId", "solution", "body", "imgurls"];
        console.log(req.body)
        for(let param of params){
            if(!req.body[param]){
                res.status(400).send("Missing parameter in request body: " + param);
                return;
            }
        }
        let clue = {
            title: req.body.title,
            clueId: req.body.clueId,
            solution: req.body.solution,
            body: req.body.body,
            imgurls: req.body.imgurls
        }
        let result = await db.collection("clues").updateOne({clueId: req.body.clueId}, {$set: clue}, {upsert: true});
        res.status(200).send("Successfully updated/added clue.");
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}