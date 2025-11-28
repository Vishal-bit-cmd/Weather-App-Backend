import mongoose, { Schema, Document, Types } from "mongoose";

export interface ForecastItem {
    date: string;
    country: string;
    avgTemp: number;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
    iconUrl: string;
}

export interface FavoriteDocument extends Document {
    user: Types.ObjectId;
    name: string;
    country: string;
    forecast: ForecastItem[];
}

const ForecastSchema = new Schema<ForecastItem>({
    date: { type: String, required: true },
    country: { type: String, required: true },
    avgTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    condition: { type: String, required: true },
    icon: { type: String, required: true },
    iconUrl: { type: String, required: true },
});

const FavoriteSchema = new Schema<FavoriteDocument>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    forecast: { type: [ForecastSchema], required: true },
}, { timestamps: true });

export default mongoose.model<FavoriteDocument>("Favorite", FavoriteSchema);
