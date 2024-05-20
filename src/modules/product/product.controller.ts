import { Request, Response } from "express";
import { productService } from "./product.service";

// create a new product

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await productService.addProductIntoDB(product);
    res.status(200).json({
      screen: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: error,
    });
  }
};

// get all products

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProductsFromDB();
    res.status(200).json({
      screen: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: error,
    });
  }
};

// get product by id

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: error,
    });
  }
};
export const productController = {
  createProduct,
  getProducts,
  getProductById
};
