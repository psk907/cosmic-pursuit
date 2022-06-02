/// This function is used by the admin to add/edit a clue.
module.exports = async function (req, res, db) {
    try{

        /**
         *  Required params
         *  clueid: The id of the clue.
         *  solution: The solution of the clue (Might be QR Code string).
         *  body : The html body of the clue. 
         *  imgurls : An array of urls to images.
         */
        let params = ["clueid", "solution", "body", "imgurls"];
        console.log(req.body)
        for(let param of params){
            if(!req.body[param]){
                res.status(400).send("Missing parameter: " + param);
                return;
            }
        }
        res.status(200).send("Successfully updated/added clue.");
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}