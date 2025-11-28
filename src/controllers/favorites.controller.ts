import { AuthRequest } from "../middleware/auth";
import { Response } from "express";
import {
    addFavoriteService,
    getFavoritesService,
    deleteFavoriteService,
} from "../services/favorites.service.js";

export const addFavorite = async (req: AuthRequest, res: Response) => {
    try {
        const { name, country } = req.body;

        if (!name || !country) {
            return res.status(400).json({ message: "Name and country are required" });
        }

        const favorite = await addFavoriteService(name, country, req.user!.id);

        return res.status(201).json(favorite);

    } catch (err: any) {
        return res.status(400).json({ message: err.message || "Failed to add favorite" });
    }
};

export const getFavorites = async (req: AuthRequest, res: Response) => {
    try {
        const favorites = await getFavoritesService(req.user!.id);
        return res.json(favorites);

    } catch (err: any) {
        return res.status(500).json({ message: "Failed to fetch favorites" });
    }
};

export const deleteFavorite = async (req: AuthRequest, res: Response) => {
    try {
        const deleted = await deleteFavoriteService(req.params.id, req.user!.id);
        return res.json({ message: "Deleted", deleted });

    } catch (err: any) {
        return res.status(404).json({ message: err.message || "Favorite not found" });
    }
};
