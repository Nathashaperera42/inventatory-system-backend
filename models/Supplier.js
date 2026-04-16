import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: String,
  email: String,
  address: String,
  productsSupplied: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
  ],
}, { timestamps: true });

export default mongoose.model("Supplier", supplierSchema);