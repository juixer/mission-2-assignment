"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const product_model_1 = require("./product.model");
// create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        // validating the product data by Joi
        const { value, error } = product_validation_1.productValidate.productCreateValidationSchema.validate(product);
        if (error) {
            return res.status(500).json({
                success: false,
                message: "something went wrong",
                error: error.details,
            });
        }
        const productName = value.name;
        const productFromDb = yield product_model_1.ProductModel.find({
            name: productName,
        });
        if (productFromDb) {
            return res.status(409).json({
                success: false,
                message: "product already exists",
            });
        }
        const result = yield product_service_1.productService.addProductIntoDB(value);
        res.status(200).json({
            screen: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error,
        });
    }
});
// get all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.getProductsFromDB();
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error,
        });
    }
});
// get product by id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.productService.getSingleProductFromDB(productId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error,
        });
    }
});
// update product by id
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const updateData = req.body;
        const { value, error } = product_validation_1.productValidate.productCreateValidationSchema.validate(updateData);
        if (error) {
            return res.status(500).json({
                success: false,
                message: "something went wrong",
                error: error.details,
            });
        }
        const result = yield product_service_1.productService.updateProductInDB(productId, value);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error,
        });
    }
});
// delete product by id
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield product_service_1.productService.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error,
        });
    }
});
// search product by text
const searchProductByText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.productService.searchProductInDB(searchTerm);
        res.status(200).json({
            success: true,
            message: `Products matching search term ${searchTerm} fetched successfully!`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error,
        });
    }
});
exports.productController = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    searchProductByText,
};
