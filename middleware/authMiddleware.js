const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1️⃣ Get the Authorization header
  const authHeader = req.headers.authorization;

  // 2️⃣ Check if header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  // 3️⃣ Extract the token from "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  try {
    // 4️⃣ Verify the token
    const decoded = jwt.verify(token, "supersecretkey");

    // 5️⃣ Attach user info to request
    req.user = decoded;

    // 6️⃣ Allow request to continue
    next();
  } catch (error) {
    // 7️⃣ Token is invalid or expired
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;