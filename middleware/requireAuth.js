const { verifyToken } = require("@clerk/express");

async function requireAuth(req, res, next) {
  try {
    // Get the token from the request header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token with Clerk
    const { sub: userId } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    req.auth = { userId }; // attach userId to request
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = requireAuth;
