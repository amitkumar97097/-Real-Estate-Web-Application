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
  cors: { origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"], credentials: true },
});

// Socket.io minimal
io.on("connection", (socket) => {
  socket.on("chat:send", (payload) => {
    socket.broadcast.emit("chat:receive", payload);
  });
});

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// DB + Start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    httpServer.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("DB error:", err.message));
