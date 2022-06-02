const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

module.exports = function (db){
    

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.get("/teams/getTeams",(req,res)=>{
        require("./api/teams/getTeams")(req,res,db);
    })
  
    app.listen(PORT, () => {
        console.log(`STARDUST Game Server listening on port ${PORT}`);
    });
}