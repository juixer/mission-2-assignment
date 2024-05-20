// create a new order;

import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await orderService.createOrderIntoDB(order);
    res.status(200).json({
      screen: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: error,
    });
  }
};

export const orderController = {
  createOrder,
};
