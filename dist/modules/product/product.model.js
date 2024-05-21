"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
exports.ProductModel = (0, mongoose_1.model)("product", productSchema);
