/// This function is used by the admin to add/edit a clue.
module.exports = async function (req, res, db) {
    try{

        /**
         *  Required params
         *  clueId: The id of the clue.
         *  solution: The solution of the clue (Might be QR Code string).
         *  body : The html body of the clue. 
         *  img_urls : An array of urls to images.
         */
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}