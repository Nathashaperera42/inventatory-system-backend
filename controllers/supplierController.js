import Supplier from "../models/Supplier.js";

export const createSupplier = async (req, res) => {
  try {
    res.status(201).json(await Supplier.create(req.body));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    res.json(await Supplier.find().populate("productsSupplied", "name sku"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSupplier = async (req, res) => {
  try {
    res.json(await Supplier.findById(req.params.id).populate("productsSupplied", "name sku"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    res.json(await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};