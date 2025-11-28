import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerService = async (name: string, email: string, password: string) => {
    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already exists");

    const hash = await bcrypt.hash(password, 10);

    return await User.create({
        name,
        email,
        password: hash,
        role: "user"
    });
};

export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const access = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
    );

    const refresh = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );

    return { user, access, refresh };
};
