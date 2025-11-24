import type { Request, Response } from "express";
import Favorite from "../models/favorites.model.js";
import { fetch5DayForecast } from "../utils/weather.js";

export const addFavorite = async (req: Request, res: Response) => {
    try {
        const { name, country } = req.body;

        if (!name) {
            return res.status(400).json({ message: "City name is required" });
        }

        const exists = await Favorite.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") }
        });

        if (exists) {
            return res.status(409).json({ message: "Already added to favorites" });
        }

        const forecast = await fetch5DayForecast(name);

        const fav = await Favorite.create({ name, country, forecast });

        return res.status(201).json({ message: "Added to favorites", favorite: fav });

    } catch (error: any) {
        console.error("Favorite Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const getFavorites = async (_req: Request, res: Response) => {
    const favorites = await Favorite.find();
    return res.json(favorites);
};

export const getFavoriteById = async (req: Request, res: Response) => {
    try {
        const favorite = await Favorite.findById(req.params.id);

        if (!favorite) {
            return res.status(404).json({ message: "Favorite city not found" });
        }

        const lastDate = new Date(favorite.forecast[0].date);
        const today = new Date();
        const diffDays = (today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);

        // ⏳ If forecast is old → refresh using backend API
        if (diffDays >= 1) {
            const updatedForecast = await fetch5DayForecast(favorite.name);
            favorite.forecast = updatedForecast;
            await favorite.save();
            return res.json({ from: "updated_api", favorite });
        }

        return res.json(favorite);

    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteFavorite = async (req: Request, res: Response) => {
    try {
        await Favorite.findByIdAndDelete(req.params.id);
        return res.json({ message: "Favorite removed" });
    } catch {
        return res.status(500).json({ message: "Delete failed" });
    }
};
