import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";
import PDFDocument from "pdfkit";

// Helper to draw a table
const drawTable = (doc, headers, rows, startX = 50, startY = 100, rowHeight = 25, columnWidths = []) => {
  let y = startY;

  // Draw header
  let x = startX;
  headers.forEach((h, i) => {
    const width = columnWidths[i] || 100;
    doc.rect(x, y, width, rowHeight).stroke();
    doc.font('Helvetica-Bold').text(h, x + 5, y + 7, { width: width - 10 });
    x += width;
  });
  y += rowHeight;

  // Draw rows
  rows.forEach(row => {
    x = startX;
    row.forEach((cell, i) => {
      const width = columnWidths[i] || 100;
      doc.rect(x, y, width, rowHeight).stroke();
      doc.font('Helvetica').text(cell?.toString() || "-", x + 5, y + 7, { width: width - 10 });
      x += width;
    });
    y += rowHeight;

    if (y + rowHeight > doc.page.height - 50) {
      doc.addPage();
      y = 50;
    }
  });
};

// STOCK PDF
export const downloadStockReportPDF = async (req, res) => {
  try {
    const products = await Product.find();
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=stock_report.pdf");
    doc.pipe(res);

    doc.fontSize(18).text("Stock Report", { align: "center" });
    doc.moveDown();

    const headers = ["Name", "Category", "Stock", "Low Stock", "Expiry"];
    const rows = products.map(p => [
      p.name, p.category, p.stock,
      p.lowStockThreshold !== undefined && p.stock <= p.lowStockThreshold ? "Yes" : "No",
      p.expiryDate ? p.expiryDate.toISOString().split("T")[0] : "N/A"
    ]);

    drawTable(doc, headers, rows, 50, 100, 25, [150, 100, 60, 60, 80]);
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};