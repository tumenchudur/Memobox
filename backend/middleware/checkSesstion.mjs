import dbUser from "../db/db_user.mjs";

async function checkSession(req, res, next) {
  const sessionToken = req.cookies.session_token;

  if (!sessionToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const session = await dbUser.findSessionByToken(sessionToken);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = session.user_id;
  next();
}

export default checkSession;
