import express from "express";
import * as controller from "../controllers/supplierController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, controller.createSupplier);
router.get("/", protect, controller.getSuppliers);
router.get("/:id", protect, controller.getSupplier);
router.put("/:id", protect, controller.updateSupplier);
router.delete("/:id", protect, admin, controller.deleteSupplier);

export default router;