const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified", verified);

    const userId = verified.userId;
    console.log("userId", userId);

    req.userId = userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = userAuth;
