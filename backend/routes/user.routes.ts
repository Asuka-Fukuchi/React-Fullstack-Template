import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getAllUser
} from "../controllers/user.controller";
import { verifyToken } from "../middleware/authVerifyToken";
import { authorizeSelfOrAdmin } from "../middleware/authSelfOrAdmin";
import { authAdmin } from "../middleware/authAdmin"; 

const router = Router();

router.get("/", verifyToken, authAdmin, getAllUser);
router.put("/:id", verifyToken, authorizeSelfOrAdmin, updateUser);
router.delete("/:id", verifyToken, authorizeSelfOrAdmin, deleteUser);

export default router;