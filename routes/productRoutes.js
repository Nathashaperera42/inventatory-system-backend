import express from "express";
import * as controller from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", upload.single("image"),protect, controller.createProduct);
router.get("/", protect,controller.getProducts);
router.put("/:id", upload.single("image"),protect, controller.updateProduct);
router.delete("/:id", protect,admin,controller.deleteProduct);

export default router;