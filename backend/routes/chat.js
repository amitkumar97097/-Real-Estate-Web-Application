import express from "express";
import Message from "../models/Message.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/:propertyId", requireAuth, async (req, res) => {
  const msgs = await Message.find({ property: req.params.propertyId }).sort({ createdAt: 1 });
  res.json(msgs);
});

router.post("/send", requireAuth, async (req, res) => {
  const { to, property, body } = req.body;
  const msg = await Message.create({ from: req.user.id, to, property, body });
  res.json(msg);
});

export default router;
