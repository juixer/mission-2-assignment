import Joi from "joi";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const orderValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Please provide an email",
    "string.email": "Please provide a valid email address",
  }),
  productId: Joi.string().pattern(objectIdPattern).required().messages({
    "any.required": "Please provide a product ID",
    "string.empty": "Product ID cannot be empty",
    "string.pattern.base": "Product ID must be a valid MongoDB ObjectId",
  }),
  price: Joi.number().required().messages({
    "any.required": "Please provide a price",
    "number.base": "Price must be a number",
  }),
  quantity: Joi.number().required().messages({
    "any.required": "Please provide a quantity",
    "number.base": "Quantity must be a number",
  }),
});

export default orderValidationSchema;
