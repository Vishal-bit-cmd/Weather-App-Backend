import { Router } from "express";
import { searchCity, getCityByName } from "../controllers/city.controller.js";
import { searchCitySchema } from "../validation/city.validation.js";
import { validateQuery } from "../middleware/city.validate.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

const router = Router();
router.use(authenticate, authorize(["user"]));

router.get("/search", validateQuery(searchCitySchema), searchCity);
router.get("/:name", getCityByName);

export default router;
