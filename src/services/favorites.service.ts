import Favorite from "../models/favorites.model.js";
import { fetch5DayForecast } from "../utils/weather.js";

export const addFavoriteService = async (name: string, country: string) => {
    const exists = await Favorite.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") }
    });

    if (exists) {
        const error: any = new Error("City already in favorites");
        error.statusCode = 409;
        throw error;
    }

    const forecast = await fetch5DayForecast(name);
    return await Favorite.create({ name, country, forecast });
};

export const getFavoritesService = async () => {
    return await Favorite.find().sort({ name: 1 });
};

export const getFavoriteByIdService = async (id: string) => {
    const favorite = await Favorite.findById(id);

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

export const deleteFavoriteService = async (id: string) => {
    const deleted = await Favorite.findByIdAndDelete(id);
    if (!deleted) {
        const err: any = new Error("Favorite city not found");
        err.statusCode = 404;
        throw err;
    }
    return deleted;
};
