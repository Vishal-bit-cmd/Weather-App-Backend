import type { Request, Response, NextFunction } from "express";

export const validateRefresh = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies?.refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    next();
};
