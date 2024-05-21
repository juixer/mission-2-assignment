"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const route = express_1.default.Router();
route.get("/", (req, res) => {
    if (req.query.email) {
        order_controller_1.orderController.getOrdersByEmail(req, res);
    }
    else {
        order_controller_1.orderController.getAllOrder(req, res);
    }
});
route.post("/", order_controller_1.orderController.createOrder);
exports.orderRoute = route;
