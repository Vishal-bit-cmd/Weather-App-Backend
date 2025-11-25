import type { Request, Response } from "express";
import { registerService, loginService } from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await registerService(name, email, password, role);

        res.status(201).json({
            message: "Registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, access, refresh } = await loginService(email, password);

    res.cookie("refreshToken", refresh, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken: access, user });
};

export const refreshAccess = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    const access = jwt.sign(
        { id: (decoded as any).id },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
    );

    res.json({ accessToken: access });
};

export const logout = async (_req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
};
