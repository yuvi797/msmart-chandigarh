import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const adminExists = await User.findOne({ email });
  if (!adminExists) {
    await User.create({
      name: "Admin",
      email,
      password: "admin123",
      phone: "9999999999",
      role: "admin",
    });
    console.log("✅ Admin created: admin@msmart.com / admin123");
  }
};
seedAdmin();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.send("MSmart Chandigarh API running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
