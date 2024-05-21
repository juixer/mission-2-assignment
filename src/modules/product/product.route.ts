import express, { Request, Response } from "express";
import { productController } from "./product.controller";

const route = express.Router();

route.post("/create-product", productController.createProduct);
route.get("/", (req: Request, res: Response) => {
  if (req.query.searchTerm) {
    productController.searchProductByText(req, res);
  } else {
    productController.getProducts(req, res);
  }
});
route.get("/:productId", productController.getProductById);
route.put("/:productId", productController.updateProductById);
route.delete("/:productId", productController.deleteProductById);

export const productRoute = route;
