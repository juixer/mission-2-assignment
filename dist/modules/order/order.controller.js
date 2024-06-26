"use strict";
// create a new order;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const product_model_1 = require("../product/product.model");
const order_validation_1 = __importDefault(require("./order.validation"));
// create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const { error, value } = order_validation_1.default.validate(order);
        if (error) {
            return res.status(500).json({
                success: false,
                message: "something went wrong",
                error: error.details,
            });
        }
        const productId = value.productId;
        const product = (yield product_model_1.ProductModel.findById(productId));
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        const { inventory } = product;
        if (value.quantity > inventory.quantity) {
            return res.status(404).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        if (inventory.inStock === false) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        const result = yield order_service_1.orderService.createOrderIntoDB(value);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            data: error,
        });
    }
});
// get all orders
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.getAllOrderFromDB();
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Orders not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            data: error,
        });
    }
});
// get orders by email
const getOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_service_1.orderService.getOrdersByEmailFromDB(email);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully for user email!!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            data: error,
        });
    }
});
exports.orderController = {
    createOrder,
    getAllOrder,
    getOrdersByEmail,
};
