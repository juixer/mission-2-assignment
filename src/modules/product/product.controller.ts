import { Request, Response } from "express";
import { productService } from "./product.service";
import { productValidate } from "./product.validation";

// create a new product

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // validating the product data by Joi
    const { value, error } =
      productValidate.productCreateValidationSchema.validate(product);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.details,
      });
    }

    const result = await productService.addProductIntoDB(value);
    res.status(200).json({
      screen: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

// get all products

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProductsFromDB();
    // if result is empty it will show not found error
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
    res.status(200).json({
      screen: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

// get product by id

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSingleProductFromDB(productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

// update product by id
const updateProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body;

    const { value, error } =
      productValidate.productUpdateValidationSchema.validate(updateData);
    if (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.details,
      });
    }

    const result = await productService.updateProductInDB(productId, value);

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

// delete product by id
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await productService.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

// search product by text
const searchProductByText = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await productService.searchProductInDB(searchTerm);
    res.status(200).json({
      success: true,
      message: `Products matching search term ${searchTerm} fetched successfully!`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

export const productController = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProductByText,
};
