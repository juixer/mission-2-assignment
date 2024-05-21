"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidate = void 0;
const joi_1 = __importDefault(require("joi"));
// create validate schema
const productCreateValidationSchema = joi_1.default.object({
    name: joi_1.default.string().max(75).required().messages({
        "any.required": "Please provide a product name",
        "string.empty": "Please provide a product name",
        "string.max": "Product name should not exceed 100 characters",
    }),
    description: joi_1.default.string().max(500).required().messages({
        "any.required": "Please provide a short description",
        "string.empty": "Please provide a short description",
        "string.max": "Description should not exceed 500 characters",
    }),
    price: joi_1.default.number().required().messages({
        "any.required": "Please provide the price",
        "number.base": "Price must be a number",
        "number.empty": "Please provide the price",
    }),
    category: joi_1.default.string().max(75).required().messages({
        "any.required": "Please provide a category",
        "string.empty": "Please provide a category",
        "string.max": "Category should not exceed 150 characters",
    }),
    tags: joi_1.default.array().items(joi_1.default.string()).required().messages({
        "any.required": "Please provide product tags",
        "array.base": "Tags must be an array",
        "array.empty": "Please provide product tags",
    }),
    variants: joi_1.default.array()
        .items(joi_1.default.object({
        type: joi_1.default.string().required().messages({
            "any.required": "Please provide variant type",
            "string.empty": "Please provide variant type",
        }),
        value: joi_1.default.string().required().messages({
            "any.required": "Please provide variant value",
            "string.empty": "Please provide variant value",
        }),
    }))
        .required()
        .messages({
        "any.required": "Please provide atleast one variant",
        "array.base": "Variants must be an array",
        "array.empty": "Please provide atleast one variant",
    }),
    inventory: joi_1.default.object({
        quantity: joi_1.default.number().required().messages({
            "any.required": "Please provide product inventory quantity",
            "number.base": "Quantity must be a number",
            "number.empty": "Please provide product inventory quantity",
        }),
        inStock: joi_1.default.boolean().required().default(true).messages({
            "any.required": "Please provide product stock information",
            "boolean.base": "Stock information must be boolean",
        }),
    })
        .required()
        .messages({
        "any.required": "Please provide inventory information",
    }),
});
const productUpdateValidationSchema = joi_1.default.object({
    name: joi_1.default.string().max(75).messages({
        "string.empty": "Please provide a product name",
        "string.max": "Product name should not exceed 75 characters",
    }),
    description: joi_1.default.string().max(500).messages({
        "string.empty": "Please provide a short description",
        "string.max": "Description should not exceed 500 characters",
    }),
    price: joi_1.default.number().messages({
        "number.base": "Price must be a number",
        "number.empty": "Please provide the price",
    }),
    category: joi_1.default.string().max(75).messages({
        "string.empty": "Please provide a category",
        "string.max": "Category should not exceed 75 characters",
    }),
    tags: joi_1.default.array().items(joi_1.default.string()).messages({
        "array.base": "Tags must be an array",
        "array.empty": "Please provide product tags",
    }),
    variants: joi_1.default.array()
        .items(joi_1.default.object({
        type: joi_1.default.string().messages({
            "string.empty": "Please provide variant type",
        }),
        value: joi_1.default.string().messages({
            "string.empty": "Please provide variant value",
        }),
    }))
        .messages({
        "array.base": "Variants must be an array",
        "array.empty": "Please provide at least one variant",
    }),
    inventory: joi_1.default.object({
        quantity: joi_1.default.number().messages({
            "number.base": "Quantity must be a number",
            "number.empty": "Please provide product inventory quantity",
        }),
        inStock: joi_1.default.boolean().default(true).messages({
            "boolean.base": "Stock information must be boolean",
        }),
    }).messages({
        "object.base": "Please provide inventory information",
    }),
});
exports.productValidate = {
    productCreateValidationSchema,
    productUpdateValidationSchema,
};
