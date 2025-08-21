import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/properties.js";
import adminRoutes from "./routes/admin.js";
import chatRoutes from "./routes/chat.js";

const app = express();
const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
    credentials: true,
  },
});

// --- Socket.io setup ---
io.on("connection", (socket) => {
  console.log("⚡ New socket connected:", socket.id);
  socket.on("chat:send", (payload) => {
    socket.broadcast.emit("chat:receive", payload);
  });
});

// --- Middleware ---
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

// --- Health Route ---
app.get("/api/health", (req, res) => res.json({ ok: true }));

// --- DB + Server Start ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Please set it in your environment variables.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    httpServer.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  });
