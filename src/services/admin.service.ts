import User from "../models/user.model.js";

export const getAllUsersService = async () => {
    return await User.find({}, { password: 0 }).sort({ createdAt: -1 });
};

export const deleteUserService = async (id: string) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        const error: any = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user;
};
