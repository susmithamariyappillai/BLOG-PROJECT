import admin from "../config/firebase.js";

// 1) Checks the Firebase login token sent by the frontend
export const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) return res.status(401).json({ message: "Please log in first" });

  try {
    req.user = await admin.auth().verifyIdToken(token); // has uid, email...
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired login. Log in again." });
  }
};

// 2) Allows only the admin user (UID stored in .env)
export const requireAdmin = (req, res, next) => {
  if (!process.env.ADMIN_UID || req.user.uid !== process.env.ADMIN_UID) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
