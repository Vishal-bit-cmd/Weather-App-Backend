import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        country: { type: String, required: true },
        forecast: { type: Array, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Favorite", FavoriteSchema);
