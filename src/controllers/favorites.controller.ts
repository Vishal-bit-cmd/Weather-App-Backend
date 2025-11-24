import type { Request, Response, NextFunction } from "express";
import {
    addFavoriteService,
    getFavoriteByIdService,
    deleteFavoriteService,
    getFavoritesService
} from "../services/favorites.service.js";

export const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const favorite = await addFavoriteService(req.body.name, req.body.country);
        res.status(201).json({ favorite });
    } catch (err) {
        next(err);
    }
};

export const getFavorites = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const favorites = await getFavoritesService();
        res.json(favorites);
    } catch (err) {
        next(err);
    }
};

export const getFavoriteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getFavoriteByIdService(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const deleteFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteFavoriteService(req.params.id);
        res.json({ message: "Favorite removed" });
    } catch (err) {
        next(err);
    }
};
