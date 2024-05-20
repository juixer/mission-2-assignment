import express, { Request, Response } from "express";
import { productController } from "./product.controller";

const route = express.Router();

route.post("/create-product", productController.createProduct);
route.get("/", productController.getProducts);
route.get("/:productId", productController.getProductById);
route.put("/:productId", productController.updateProductById);
route.delete("/:productId", productController.deleteProductById);

export const productRoute = route;
