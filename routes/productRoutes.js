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

router.post("/", upload.single("image"), controller.createProduct,protect);
router.get("/", controller.getProducts,protect);
router.put("/:id", upload.single("image"), controller.updateProduct,protect);
router.delete("/:id", controller.deleteProduct,protect,admin);

export default router;