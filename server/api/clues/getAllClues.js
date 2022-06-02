module.exports = async function (req, res, db) {
    try{

        let teams = await db.collection("clues").find({}).toArray();
        res.status(200).json(teams);
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}