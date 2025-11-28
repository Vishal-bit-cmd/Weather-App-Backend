import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cityRoutes from "./routes/city.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/favorites", favoritesRoutes);

app.get("/", (req, res) => res.send("Weather API running"));

app.listen(process.env.PORT || 5000, () =>
    console.log("Server running")
);
