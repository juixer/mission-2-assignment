import express, { Request, Response } from "express";
import { orderController } from "./order.controller";

const route = express.Router();

route.get("/", (req: Request, res: Response) => {
  if (req.query.email) {
    orderController.getOrdersByEmail(req, res);
  } else {
    orderController.getAllOrder(req, res);
  }
});

route.post("/", orderController.createOrder);

export const orderRoute = route;
