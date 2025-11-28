import { Request, Response } from "express";
import { getAllUsersService, deleteUserService } from "../services/admin.service.js";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService();
        res.json(users);
    } catch (err: any) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteUserService(id);
        res.json({ message: "User deleted successfully" });
    } catch (err: any) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
