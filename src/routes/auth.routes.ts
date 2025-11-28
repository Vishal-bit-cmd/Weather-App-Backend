import { Router } from "express";
import { register, login, refreshAccess, profile, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.get("/refresh", refreshAccess);
router.post("/logout", logout);

export default router;
