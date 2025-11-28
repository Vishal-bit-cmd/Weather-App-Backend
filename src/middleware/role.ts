import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";

export const authorize =
    (roles: ("user" | "admin")[]) =>
        (req: AuthRequest, res: Response, next: NextFunction) => {
            if (!req.user) {
                return res.status(401).json({ message: "Not authenticated" });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Access denied: insufficient role" });
            }

            next();
        };
