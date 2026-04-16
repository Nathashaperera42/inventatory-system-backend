import express from "express";
import * as controller from "../controllers/supplierController.js";

const router = express.Router();

router.post("/", controller.createSupplier);
router.get("/", controller.getSuppliers);
router.get("/:id", controller.getSupplier);
router.put("/:id", controller.updateSupplier);
router.delete("/:id", controller.deleteSupplier);

export default router;