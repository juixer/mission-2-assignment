"use strict";
// create order into db
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
exports.orderService = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
// create order into db
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const id = order.productId;
    const orderQuantity = order.quantity;
    order.price = order.price * orderQuantity;
    const product = (yield product_model_1.ProductModel.findById(id));
    const { inventory } = product;
    const quantity = inventory.quantity - orderQuantity;
    const inStock = quantity > 0;
    yield product_model_1.ProductModel.findByIdAndUpdate(id, {
        "inventory.quantity": quantity,
        "inventory.inStock": inStock,
    }, { new: true });
    const result = yield order_model_1.OrderModel.create(order);
    return result;
});
// get all orders from db
const getAllOrderFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
// get orders by email
const getOrdersByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.aggregate([
        { $match: { email: email } },
        {
            $group: {
                _id: "$email",
                orders: {
                    $push: {
                        productId: "$productId",
                        price: "$price",
                        quantity: "$quantity",
                    },
                },
            },
        },
    ]);
    return result;
});
exports.orderService = {
    createOrderIntoDB,
    getAllOrderFromDB,
    getOrdersByEmailFromDB,
};
