import { Router, Request, Response } from "express";
import { Product } from "../models/Product";

const router = Router();

// GET /api/products?category=minecraft
// GET /api/products          (all active — for admin / generic use)
router.get("/", async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = { active: true };
    if (req.query.category) {
      filter.category = req.query.category as string;
    }
    const products = await Product.find(filter).sort({ order: 1 });
    res.json({ success: true, data: products });
  } catch (err) {
    console.error("GET /api/products error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

// GET /api/products/:slug — single product
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, active: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    console.error("GET /api/products/:slug error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
});

export default router;
