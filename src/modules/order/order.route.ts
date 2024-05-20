import express from "express";
import { orderController } from "./order.controller";

const route = express.Router();

route.post("/create-order", orderController.createOrder);

export const orderRoute = route;
