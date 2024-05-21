"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const orderValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "any.required": "Please provide an email",
        "string.email": "Please provide a valid email address",
    }),
    productId: joi_1.default.string().pattern(objectIdPattern).required().messages({
        "any.required": "Please provide a product ID",
        "string.empty": "Product ID cannot be empty",
        "string.pattern.base": "Product ID must be a valid MongoDB ObjectId",
    }),
    price: joi_1.default.number().required().messages({
        "any.required": "Please provide a price",
        "number.base": "Price must be a number",
    }),
    quantity: joi_1.default.number().required().messages({
        "any.required": "Please provide a quantity",
        "number.base": "Quantity must be a number",
    }),
});
exports.default = orderValidationSchema;
