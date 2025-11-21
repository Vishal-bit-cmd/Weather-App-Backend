import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    name: String,
    country: String,
    forecast: Array
});

export default mongoose.model("City", citySchema);
