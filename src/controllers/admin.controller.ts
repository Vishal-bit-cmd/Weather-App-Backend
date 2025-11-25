import type { Request, Response, NextFunction } from "express";
import {
    getAllUsersService,
    deleteUserService
} from "../services/admin.service.js";

/**
 * Get all users
 */
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersService();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

/**
 * Delete a user
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteUserService(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        next(err);
    }
};
