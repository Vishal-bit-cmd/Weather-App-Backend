import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { allow } from "../middleware/role.js";
import City from "../models/city.model.js";

const router = Router();

router.delete("/city/:id", auth, allow("admin"), async (req, res) => {
    await City.findByIdAndDelete(req.params.id);
    res.json({ message: "City deleted by admin" });
});

export default router;
