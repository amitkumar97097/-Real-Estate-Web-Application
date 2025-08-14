import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    body: String,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);

---
