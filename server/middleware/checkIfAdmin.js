async function checkIfAdmin(req, res, db, next) {
  const { uid } = req.headers;

  try {
    if (!uid) return res.status(401).send({ message: "Unauthorized" });
    let teamDetails = await db.collections("teams").findOne({ uid: uid });
    if (!teamDetails)
      return res.status(401).json({ message: "Unauthorized access" });
    else if (teamDetails.teamNo !== 1 || !teamDetails.adminKey)
      return res.status(401).json({ message: "Unauthorized access" });

    return next();
  } catch (e) {
    console.log(e["errorInfo"]);
    return res.json({
      message: e["errorInfo"]["message"] || "Internal server error",
    });
  }
}

module.exports = { checkIfAdmin };
