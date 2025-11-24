import mongoose, { Schema, Document } from "mongoose";
import { FavoriteType, ForecastItem } from "../types/favorite.types.js";

export interface FavoriteDocument extends FavoriteType, Document {}

const ForecastSchema = new Schema<ForecastItem>({
    date: { type: String, required: true },
    country: { type: String, required: true },
    avgTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    condition: { type: String, required: true },
    icon: { type: String, required: true },
    iconUrl: { type: String, required: true }
});

const FavoriteSchema = new Schema<FavoriteDocument>(
    {
        name: { type: String, required: true },
        country: { type: String, required: true },
        forecast: { type: [ForecastSchema], required: true }
    },
    { timestamps: true }
);

export default mongoose.model<FavoriteDocument>("Favorite", FavoriteSchema);
