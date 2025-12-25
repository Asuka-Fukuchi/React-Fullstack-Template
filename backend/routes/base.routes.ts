import { Router } from "express";
import {
  createModel,
  getMyModel,
  getModelById,
  updateModel,
  deleteModel
} from "../controllers/baseCrud.controller";
import { verifyToken } from "../middleware/authVerifyToken";
const router = Router();

router.get("/", verifyToken, getMyModel);
router.get("/:id", verifyToken, getModelById);
router.post("/create", verifyToken, createModel)
router.put("/:id", verifyToken, updateModel);
router.delete("/:id", verifyToken, deleteModel);

export default router;