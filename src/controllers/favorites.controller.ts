import type { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.js";
import {
    addFavoriteService,
    getFavoritesService,
    getFavoriteByIdService,
    deleteFavoriteService
} from "../services/favorites.service.js";

export const addFavorite = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!._id;
        const favorite = await addFavoriteService(req.body.name, req.body.country, userId);
        res.status(201).json({ favorite });
    } catch (err) {
        next(err);
    }
};

export const getFavorites = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!._id;
        const favorites = await getFavoritesService(userId);
        res.json(favorites);
    } catch (err) {
        next(err);
    }
};

export const getFavoriteById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!._id;
        const result = await getFavoriteByIdService(req.params.id, userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const deleteFavorite = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!._id;
        await deleteFavoriteService(req.params.id, userId);
        res.json({ message: "Favorite removed" });
    } catch (err) {
        next(err);
    }
};
