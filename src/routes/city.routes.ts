import { Router } from "express";
import { searchCity, getCityByName, getAllCities } from "../controllers/city.controller.js";
import { searchCitySchema } from "../validation/city.validation.js";
import { validateQuery } from "../middleware/city.validate.js";

const router = Router();

router.get("/", getAllCities);

router.get("/search", validateQuery(searchCitySchema), searchCity);

router.get("/:name", getCityByName);

export default router;
