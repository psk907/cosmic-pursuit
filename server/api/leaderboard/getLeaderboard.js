module.exports = async function getLeaderboard(req, res,db) {
    let teams  = await db.collection("teams").find().toArray();
    let teamsFiltered = teams.map(team => {
        return {
            teamName:team.teamName,
            score:team.score,
            unlockedClues:team.unlockedClues.length,
            members:team.members??[]
        };
    });
    teamsFiltered.sort((a,b)=>{
        return b.score-a.score;
    });

    return res.status(200).json(teamsFiltered);
}