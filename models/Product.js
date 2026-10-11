import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    mrp: { type: Number, default: 0 },
    category: { type: String, required: true },
    image: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    unit: { type: String, default: "1 pc" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);