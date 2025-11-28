import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { getAllUsers, deleteUser } from "../controllers/admin.controller.js";

const router = Router();

router.use(authenticate, authorize(["admin"]));

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

export default router;
