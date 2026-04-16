import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  variant: { type: String, required: true },
  sku: {
    type: String,
    unique: true,
    required: true,
    default: function () {
      const catCode = this.category?.substring(0, 2).toUpperCase() || "XX";
      const prodCode = this.name?.substring(0, 3).toUpperCase() || "PRD";
      const varCode = this.variant?.substring(0, 3).toUpperCase() || "VAR";
      return `${catCode}-${prodCode}-${varCode}`;
    },
  },
  unit: { type: String, default: "pcs" },
  costPrice: { type: Number, required: true, default: 0 },
  sellingPrice: { type: Number, required: true, default: 0 },
  discount: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  lowStockThreshold: { type: Number, default: 10 },
  expiryDate: { type: Date },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);