import { model, Schema } from "mongoose";
import { Product } from "./product.interface";

const productSchema = new Schema<Product>({
  name: { type: String, required: [true, "Please provide a product name"] },
  description: {
    type: String,
    required: [true, "Please provide a short description"],
  },
  price: { type: Number, required: [true, "Please provide the price"] },
  category: { type: String, required: [true, "Please provide a category"] },
  tags: { type: [String], required: [true, "Please provide product tags"] },
  variants: {
    type: [
      {
        type: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    required: [true, "Please provide atleast one variant"],
  },
  inventory: {
    quantity: {
      type: Number,
      required: [true, "Please provide product inventory quantity"],
    },
    inStock: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
});

export const ProductModel = model<Product>("product", productSchema);
