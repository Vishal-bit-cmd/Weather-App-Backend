import type { Request, Response, NextFunction } from "express";
import { searchCityService, getAllCitiesService, getCityByNameService } from "../services/city.service.js";

export const searchCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const q = req.query.q as string;
        const result = await searchCityService(q);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const getCityByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.params.name;
        const city = await getCityByNameService(name);
        res.json(city);
    } catch (err) {
        next(err);
    }
};

export const getAllCities = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const cities = await getAllCitiesService();
        res.json(cities);
    } catch (err) {
        next(err);
    }
};
