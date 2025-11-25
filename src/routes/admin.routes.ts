import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { allow } from "../middleware/role.js";
import { getAllUsers, deleteUser } from "../controllers/admin.controller.js";

const router = Router();

// Users management
router.get("/users", auth, allow("admin"), getAllUsers);
router.delete("/users/:id", auth, allow("admin"), deleteUser);

export default router;
