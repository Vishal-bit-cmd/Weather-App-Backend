import { Router } from "express";
import { register, login, refreshAccess, logout } from "../controllers/auth.contoller.js";
import { validate } from "../middleware/favorite.validate.js";
import { registerSchema, loginSchema } from "../validation/auth.validation.js";
import { validateRefresh } from "../middleware/refresh.validate.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/refresh", validateRefresh, refreshAccess);
router.post("/logout", logout);

export default router;
