import type { Request, Response, NextFunction } from "express";

export const allow = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = (req as any).user.role;
        if (!roles.includes(role)) return res.status(403).json({ message: "Forbidden" });
        next();
    };
};
