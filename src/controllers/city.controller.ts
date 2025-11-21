import type { Request, Response } from "express";
import City from "../models/city.model.js";
import { fetch5DayForecast } from "../utils/weather.js";

export const searchCity = async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: "City query required" });
        }

        const cityName = String(q).trim().toLowerCase();

        let city = await City.findOne({
            name: { $regex: new RegExp(`^${cityName}$`, "i") }
        });

        if (!city) {
            const forecastArray = await fetch5DayForecast(cityName);

            if (!forecastArray || forecastArray.length === 0) {
                return res.status(404).json({ message: "City not found" });
            }

            city = await City.create({
                name: cityName,
                country: forecastArray[0].country ?? "Unknown",
                forecast: forecastArray
            });

            return res.json({ from: "api", city });
        }

        const lastDate = new Date(city.forecast[0].date);
        const today = new Date();
        const diffDays = (today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);

        if (diffDays >= 1) {
            const updatedForecast = await fetch5DayForecast(cityName);
            city.forecast = updatedForecast;
            await city.save();
            return res.json({ from: "updated_api", city });
        }

        return res.json({ from: "database", city });

    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

export const getCityByName = async (req: Request, res: Response) => {
    try {
        const cityName = req.params.name.toLowerCase();

        const city = await City.findOne({
            name: { $regex: new RegExp(`^${cityName}$`, "i") }
        });

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        return res.json(city);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

export const getAllCities = async (req: Request, res: Response) => {
    try {
        const cities = await City.find().sort({ name: 1 });
        return res.json(cities);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};