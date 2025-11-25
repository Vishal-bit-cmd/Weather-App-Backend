import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request type
export interface AuthRequest extends Request {
    user?: { _id: string; role: string; name?: string };
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token provided" });

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload & {
            _id: string;
            role: string;
            name?: string;
        };

        // Type assertion here avoids Express type mismatch
        (req as AuthRequest).user = { _id: decoded._id, role: decoded.role, name: decoded.name };

        next();
    } catch {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
