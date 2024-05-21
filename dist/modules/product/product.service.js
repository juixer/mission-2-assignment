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
exports.productService = void 0;
const product_model_1 = require("./product.model");
// create a new Product
const addProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
// get all products from DB
const getProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find();
    return result;
});
// get single product from DB
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findById(productId);
    return result;
});
// update product in DB
const updateProductInDB = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // updating product by using mongoose findByIdAndUpdate
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(productId, { $set: updateData }, { new: true, runValidators: true });
    return result;
});
// delete product from DB
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndDelete(productId);
    return result;
});
// search product in DB
const searchProductInDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    // using mongodb regex to search for products
    const regex = new RegExp(searchTerm, "i");
    const result = yield product_model_1.ProductModel.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
            { category: { $regex: regex } },
            { tags: { $regex: regex } },
        ],
    });
    return result;
});
exports.productService = {
    addProductIntoDB,
    getProductsFromDB,
    getSingleProductFromDB,
    updateProductInDB,
    deleteProductFromDB,
    searchProductInDB,
};
