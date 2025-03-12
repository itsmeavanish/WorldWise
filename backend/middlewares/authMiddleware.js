const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const JWT_SECRET="ilovenobody"
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token,JWT_SECRET);

    // Find the user in the database and exclude the password field
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Not authorized, token verification failed" });
  }
};

module.exports = { protect };
