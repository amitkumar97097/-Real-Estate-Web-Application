import express from "express";
import Property from "../models/Property.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { createCheckoutSession } from "../utils/stripe.js";

const router = express.Router();

router.get("/pending", requireAuth, requireRole("admin"), async (req, res) => {
  const items = await Property.find({ approved: false }).sort({ createdAt: -1 });
  res.json(items);
});

router.post("/approve/:id", requireAuth, requireRole("admin"), async (req, res) => {
  const prop = await Property.findById(req.params.id);
  if (!prop) return res.status(404).json({ error: "Not found" });
  prop.approved = true;
  await prop.save();
  res.json(prop);
});

router.post("/premium/checkout", requireAuth, async (req, res) => {
  const session = await createCheckoutSession({ customerEmail: req.body.email });
  res.json({ url: session.url });
});

export default router;

---
