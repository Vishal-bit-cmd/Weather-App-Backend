import { Router } from "express";
import {
    addFavorite,
    getFavorites,
    deleteFavorite
} from "../controllers/favorites.controller.js";

import { addFavoriteSchema } from "../validation/favorites.validation.js";
import { validate } from "../middleware/favorite.validate.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

const router = Router();

router.use(authenticate, authorize(["user"]));

router.post("/", validate(addFavoriteSchema), addFavorite);

router.get("/", getFavorites);

router.delete("/:id", deleteFavorite);

export default router;
