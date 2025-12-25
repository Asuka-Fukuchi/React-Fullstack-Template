import { Router } from "express";
import {
  createUser,
  login,
  authMe
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/authVerifyToken";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/me", verifyToken, authMe);

export default router;