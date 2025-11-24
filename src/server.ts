import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cityRoutes from "./routes/city.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/favorites", favoritesRoutes);

app.get('/', (req, res) => {
    res.send('Weather API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



