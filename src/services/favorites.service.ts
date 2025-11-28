import Favorite from "../models/favorites.model.js";
import { fetch5DayForecast } from "../utils/weather.js";
import { ForecastItem } from "../types/favorite.types.js";
import { Types } from "mongoose";

export const addFavoriteService = async (
    name: string,
    country: string,
    userId: string
) => {
    const userObjectId = new Types.ObjectId(userId);

    const exists = await Favorite.findOne({
        name: { $regex: `^${name}$`, $options: "i" },
        user: userObjectId
    });
    if (exists) throw new Error("City already in favorites");

    const forecast: ForecastItem[] = await fetch5DayForecast(name);
    return await Favorite.create({ name, country, forecast, user: userObjectId });
};

export const getFavoritesService = async (userId: string) => {
    const userObjectId = new Types.ObjectId(userId);
    return await Favorite.find({ user: userObjectId }).sort({ name: 1 });
};

export const getFavoriteByIdService = async (id: string, userId: string) => {
    const userObjectId = new Types.ObjectId(userId);
    const favorite = await Favorite.findOne({ _id: id, user: userObjectId });
    if (!favorite) throw new Error("Favorite city not found");

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
    const userObjectId = new Types.ObjectId(userId);
    const deleted = await Favorite.findOneAndDelete({ _id: id, user: userObjectId });
    if (!deleted) throw new Error("Favorite city not found");
    return deleted;
};
