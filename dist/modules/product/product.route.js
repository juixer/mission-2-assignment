"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const route = express_1.default.Router();
// create route
route.post("/", product_controller_1.productController.createProduct);
// get all products route and search route
route.get("/", (req, res) => {
    if (req.query.searchTerm) {
        product_controller_1.productController.searchProductByText(req, res);
    }
    else {
        product_controller_1.productController.getProducts(req, res);
    }
});
// single product route
route.get("/:productId", product_controller_1.productController.getProductById);
// update product route
route.put("/:productId", product_controller_1.productController.updateProductById);
// delete product route
route.delete("/:productId", product_controller_1.productController.deleteProductById);
exports.productRoute = route;
