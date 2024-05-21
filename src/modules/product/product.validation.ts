import Joi from 'joi'

const productValidationSchema = Joi.object({
  name: Joi.string().max(75).required().messages({
    "any.required": "Please provide a product name",
    "string.empty": "Please provide a product name",
    "string.max": "Product name should not exceed 100 characters",
  }),
  description: Joi.string().max(500).required().messages({
    "any.required": "Please provide a short description",
    "string.empty": "Please provide a short description",
    "string.max": "Description should not exceed 500 characters",
  }),
  price: Joi.number().required().messages({
    "any.required": "Please provide the price",
    "number.base": "Price must be a number",
    "number.empty": "Please provide the price",
  }),
  category: Joi.string().max(75).required().messages({
    "any.required": "Please provide a category",
    "string.empty": "Please provide a category",
    "string.max": "Category should not exceed 150 characters",
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Please provide product tags",
    "array.base": "Tags must be an array",
    "array.empty": "Please provide product tags",
  }),
  variants: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required().messages({
          "any.required": "Please provide variant type",
          "string.empty": "Please provide variant type",
        }),
        value: Joi.string().required().messages({
          "any.required": "Please provide variant value",
          "string.empty": "Please provide variant value",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "Please provide atleast one variant",
      "array.base": "Variants must be an array",
      "array.empty": "Please provide atleast one variant",
    }),
  inventory: Joi.object({
    quantity: Joi.number().required().messages({
      "any.required": "Please provide product inventory quantity",
      "number.base": "Quantity must be a number",
      "number.empty": "Please provide product inventory quantity",
    }),
    inStock: Joi.boolean().required().default(true).messages({
      "any.required": "Please provide product stock information",
      "boolean.base": "Stock information must be boolean",
    }),
  })
    .required()
    .messages({
      "any.required": "Please provide inventory information",
    }),
});

export default productValidationSchema;
