import { Router } from "express";
import {
    addFavorite,
    getFavorites,
    getFavoriteById,
    deleteFavorite
} from "../controllers/favorites.controller.js";

import { validate } from "../middleware/favorite.validate.js";
import { addFavoriteSchema } from "../validation/favorites.validation.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.use(auth);

router.post("/", validate(addFavoriteSchema), addFavorite);
router.get("/", getFavorites);
router.get("/:id", getFavoriteById);
router.delete("/:id", deleteFavorite);

export default router;
