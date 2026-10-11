import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Seed admin
const seedAdmin = async () => {
    try {
        const email = process.env.ADMIN_EMAIL;

        if (!email) {
            console.log("⚠️ ADMIN_EMAIL is not defined in .env");
            return;
        }

        const adminExists = await User.findOne({ email });

        if (!adminExists) {
            await User.create({
                name: "Admin",
                email,
                password: "admin123",
                phone: "9999999999",
                role: "admin",
            });

            console.log(`✅ Admin created: ${email} / admin123`);
        } else {
            console.log("ℹ️ Admin already exists");
        }
    } catch (error) {
        console.error("❌ Admin seeding failed:", error.message);
    }
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("MSmart Chandigarh API running...");
});

// Start server only after DB connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        await seedAdmin();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
