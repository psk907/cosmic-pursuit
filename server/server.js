const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json())
module.exports = function (db){
    

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.get("/teams/getTeams",(req,res)=>{
        require("./api/teams/getTeams")(req,res,db);
    })


    app.get("/clues/getAllClues",(req,res)=>{
        require("./api/clues/getAllClues")(req,res,db);
    })
    app.get("/clues/getClue",(req,res)=>{
        require("./api/clues/getClue")(req,res,db);
    })
    app.post("/clues/postClue",(req,res)=>{
        require("./api/clues/postClue")(req,res,db);
    })

  
    app.listen(PORT, () => {
        console.log(`STARDUST Game Server listening on port ${PORT}`);
    });
}