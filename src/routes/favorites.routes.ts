import { Router } from "express";
import {
    addFavorite,
    getFavorites,
    getFavoriteById,
    deleteFavorite
} from "../controllers/favorites.controller.js";

import { validate } from "../middleware/favorite.validate.js";
import { addFavoriteSchema } from "../validation/favorites.validation.js";

const router = Router();

router.post("/", validate(addFavoriteSchema), addFavorite);
router.get("/", getFavorites);
router.get("/:id", getFavoriteById);
router.delete("/:id", deleteFavorite);

export default router;
