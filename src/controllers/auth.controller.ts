import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerService, loginService } from "../services/auth.service.js";
import { setTokenCookies } from "../utils/tokens.js";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const user = await registerService(name, email, password);

        res.status(201).json({ message: "Registered", user });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const { user, access, refresh } = await loginService(email, password);

        setTokenCookies(res, access, refresh);

        res.json({ message: "Logged in", user });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const profile = async (req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET!
        ) as any;

        return res.json({
            user: {
                id: decoded.id,
                role: decoded.role
            }
        });
    } catch {
        return res.status(401).json({ message: "Access token expired" });
    }
};

export const refreshAccess = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "No refresh token" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET!
        ) as any;

        const newAccess = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.JWT_ACCESS_SECRET!,
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", newAccess, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 15 * 60 * 1000
        });

        res.json({ message: "Access refreshed" });
    } catch {
        res.status(401).json({ message: "Invalid refresh token" });
    }
};

export const logout = async (_req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
};
