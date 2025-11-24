import City from "../models/city.model.js";
import { fetch5DayForecast } from "../utils/weather.js";

export const searchCityService = async (cityName: string) => {
    const name = cityName.trim().toLowerCase();

    let city = await City.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });

    if (!city) {
        const forecast = await fetch5DayForecast(name);

        if (!forecast.length) {
            const err: any = new Error("City not found");
            err.statusCode = 404;
            throw err;
        }

        city = await City.create({
            name,
            country: forecast[0].country ?? "Unknown",
            forecast
        });

        return { from: "api", city };
    }

    const lastDate = new Date(city.forecast[0].date);
    const diffDays = (Date.now() - lastDate.getTime()) / (1000 * 3600 * 24);

    if (diffDays >= 1) {
        const updatedForecast = await fetch5DayForecast(name);
        city.forecast = updatedForecast;
        await city.save();
        return { from: "updated_api", city };
    }

    return { from: "database", city };
};


export const getCityByNameService = async (name: string) => {
    const city = await City.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") }
    });

    if (!city) {
        const err: any = new Error("City not found");
        err.statusCode = 404;
        throw err;
    }

    return city;
};


export const getAllCitiesService = async () => {
    return await City.find().sort({ name: 1 });
};
