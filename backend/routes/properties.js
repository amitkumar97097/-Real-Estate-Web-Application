import express from "express";
import Property from "../models/Property.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { uploader } from "../utils/cloudinary.js";

const router = express.Router();

// Public list
router.get("/", async (req, res) => {
  const { city, type, min, max, beds } = req.query;
  const q = { approved: true };
  if (city) q["location.city"] = new RegExp(city, "i");
  if (type) q.type = type;
  if (beds) q.bedrooms = { $gte: Number(beds) };
  if (min || max) q.price = { $gte: Number(min) || 0, $lte: Number(max) || 1e15 };
  const items = await Property.find(q).sort({ createdAt: -1 });
  res.json(items);
});

// Single
router.get("/:id", async (req, res) => {
  const item = await Property.findById(req.params.id);
  if (!item || !item.approved) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// Create (seller/agent)
router.post(
  "/",
  requireAuth,
  requireRole("seller", "agent", "admin"),
  uploader.array("images", 8),
  async (req, res) => {
    const payload = JSON.parse(req.body.payload || "{}");
    const images = (req.files || []).map((f) => f.path);
    const created = await Property.create({ ...payload, images, createdBy: req.user.id, approved: false });
    res.json(created);
  }
);

// Update
router.put("/:id", requireAuth, async (req, res) => {
  const prop = await Property.findById(req.params.id);
  if (!prop) return res.status(404).json({ error: "Not found" });
  if (String(prop.createdBy) !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });
  Object.assign(prop, req.body);
  await prop.save();
  res.json(prop);
});

// Delete
router.delete("/:id", requireAuth, async (req, res) => {
  const prop = await Property.findById(req.params.id);
  if (!prop) return res.status(404).json({ error: "Not found" });
  if (String(prop.createdBy) !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });
  await prop.deleteOne();
  res.json({ ok: true });
});

export default router;

---
