import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// Frontend calls this after login to find out if the user is admin
router.get("/me", verifyToken, (req, res) => {
  res.json({
    uid: req.user.uid,
    email: req.user.email,
    isAdmin: !!process.env.ADMIN_UID && req.user.uid === process.env.ADMIN_UID,
  });
});

export default router;
