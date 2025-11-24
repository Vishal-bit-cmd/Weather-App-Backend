import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";

export const registerService = async (
    name: string,
    email: string,
    password: string,
    role?: string
) => {
    if (await User.findOne({ email })) throw new Error("Email already exists");

    const hash = await bcrypt.hash(password, 10);

    const userRole = role === "admin" ? "admin" : "user";

    const user = await User.create({
        name,
        email,
        password: hash,
        role: userRole,
    });

    return user;
};

export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const access = generateAccessToken({ id: user._id, role: user.role });
    const refresh = generateRefreshToken({ id: user._id });

    return { user, access, refresh };
};
