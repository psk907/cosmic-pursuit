/// This function is used by the admin to add/edit a clue.
module.exports = async function (req, res, db) {
    try{

        /** POST
         *  Required params
         *  title: The title of the clue.
         *  clueid: The id of the clue.
         *  solution: The solution of the clue (Might be a QR Code string).
         *  body : The html body of the clue. 
         *  imgurls : An array of urls to images.
         */
        let params = ["title","clueid", "solution", "body", "imgurls"];
        console.log(req.body)
        for(let param of params){
            if(!req.body[param]){
                res.status(400).send("Missing parameter in request body: " + param);
                return;
            }
        }
        let clue = {
            title: req.body.title,
            clueid: req.body.clueid,
            solution: req.body.solution,
            body: req.body.body,
            imgurls: req.body.imgurls
        }
        let result = await db.collection("clues").updateOne({clueid: req.body.clueid}, {$set: clue}, {upsert: true});
        res.status(200).send("Successfully updated/added clue.");
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}