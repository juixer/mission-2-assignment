import express, { Request, Response } from "express";
import { productController } from "./product.controller";

const route = express.Router();

// create route
route.post("/", productController.createProduct);

// get all products route and search route
route.get("/", (req: Request, res: Response) => {
  if (req.query.searchTerm) {
    productController.searchProductByText(req, res);
  } else {
    productController.getProducts(req, res);
  }
});

// single product route
route.get("/:productId", productController.getProductById);

// update product route
route.put("/:productId", productController.updateProductById);

// delete product route
route.delete("/:productId", productController.deleteProductById);

export const productRoute = route;
