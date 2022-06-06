module.exports = async function getLeaderboard(req, res,db) {
    let teams  = await db.collection("teams").find().toArray();
    let teamsFiltered = teams.map(team => {
        return {
            teamName:team.teamName,
            score:team.score,
            unlockedClues:team.unlockedClues.length,
            members:team.members??[],
            lastSubmissionTimeStamp:team.lastSubmissionTimeStamp??null,
        };
    });
    teamsFiltered.sort((a,b)=>{
        if(b.score!=a.score)
            return b.score-a.score;
        if(a.lastSubmissionTimeStamp  && b.lastSubmissionTimeStamp){
            return a.lastSubmissionTimeStamp - b.lastSubmissionTimeStamp;
        }
        else if(a.lastSubmissionTimeStamp){
            return -1;
        }
        else {
            return 1;
        }
    });

    return res.status(200).json(teamsFiltered);
}