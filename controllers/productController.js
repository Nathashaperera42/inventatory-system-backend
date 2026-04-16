import Product from "../models/Product.js";
import path from "path";

// CREATE
export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    };
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      ...(req.file && { image: `/uploads/${req.file.filename}` }),
    };
    const updated = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};