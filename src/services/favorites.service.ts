import Favorite from "../models/favorites.model.js";
import { fetch5DayForecast } from "../utils/weather.js";

export const addFavoriteService = async (
    name: string,
    country: string,
    userId: string
) => {
    const exists = await Favorite.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
        userId
    });

    if (exists) {
        const error: any = new Error("City already in favorites");
        error.statusCode = 409;
        throw error;
    }

    const forecast = await fetch5DayForecast(name);

    return await Favorite.create({ name, country, forecast, userId });
};

export const getFavoritesService = async (userId: string) => {
    return await Favorite.find({ userId }).sort({ name: 1 });
};

export const getFavoriteByIdService = async (id: string, userId: string) => {
    const favorite = await Favorite.findOne({ _id: id, userId });
    if (!favorite) {
        const err: any = new Error("Favorite city not found");
        err.statusCode = 404;
        throw err;
    }

    const lastDate = new Date(favorite.forecast[0].date);
    const diffDays = (Date.now() - lastDate.getTime()) / (1000 * 3600 * 24);

    if (diffDays >= 1) {
        const updatedForecast = await fetch5DayForecast(favorite.name);
        favorite.forecast = updatedForecast;
        await favorite.save();
        return { from: "updated_api", favorite };
    }

    return { from: "database", favorite };
};

export const deleteFavoriteService = async (id: string, userId: string) => {
    const deleted = await Favorite.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
        const err: any = new Error("Favorite city not found");
        err.statusCode = 404;
        throw err;
    }
    return deleted;
};
