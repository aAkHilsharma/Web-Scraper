const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) return res.status(401).send("Access Denied");

  jwt.verify(token, process.env.jwt_secret, async (err, { user }) => {
    const userDetails = await User.findById(user.id)
      .select("-password")
      .select("-email");

    if (err) return res.status(403).send("Invalid token");
    req.user = userDetails;
    next();
  });
};

module.exports = authMiddleware;
