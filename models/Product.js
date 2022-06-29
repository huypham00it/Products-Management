import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      required: [true, "Please provide product's name"],
    },
    image: {
      type: String,
      required: [true, "Please provide product's image link"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product's price "],
    },
    status: {
      type: String,
      enum: ["Delivering", "Delivered", "Cancelled"],
      default: "Delivering",
    },
    type: {
      type: String,
      enum: ["Clothes", "Footwear", "Jewelry", "Perfume", "Cosmetics", "Glasses", "Bags"],
      default: "Clothes",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
