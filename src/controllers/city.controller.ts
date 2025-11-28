import type { Request, Response, NextFunction } from "express";
import { searchCityService, getCityByNameService } from "../services/city.service.js";
import { AuthRequest } from "../middleware/auth.js";

export const searchCity = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const q = req.query.q as string;
        const result = await searchCityService(q);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const getCityByName = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const name = req.params.name;
        const city = await getCityByNameService(name);
        res.json(city);
    } catch (err) {
        next(err);
    }
};

