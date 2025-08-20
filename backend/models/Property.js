import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    type: { type: String, enum: ["rent", "sale"], default: "sale" },
    bedrooms: { type: Number, default: 1 },
    bathrooms: { type: Number, default: 1 },
    area: Number,
    amenities: [String],
    images: [String],
    location: {
      address: String,
      city: String,
      state: String,
      lat: Number,
      lng: Number,
    },
    approved: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
