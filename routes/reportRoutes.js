import express from "express";
import { downloadStockReportPDF } from "../controllers/reportController.js";

const router = express.Router();

router.get("/stock/pdf", downloadStockReportPDF);

export default router;