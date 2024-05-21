"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_route_1 = require("./modules/product/product.route");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const order_route_1 = require("./modules/order/order.route");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routing
// product routes
app.use("/api/products", product_route_1.productRoute);
// order routes
app.use("/api/orders", order_route_1.orderRoute);
// default route
app.get("/", (req, res) => {
    res.send("Welcome to E-commerce Project!");
});
// Global route
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found`,
    });
});
// error route
app.use((error, req, res) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "something went wrong",
        });
    }
});
exports.default = app;
