const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: "You are not login,You must login first" });
  }
};

module.exports = authenticateUser;
