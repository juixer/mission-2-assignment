// create a new order;

import { Request, Response } from "express";
import { orderService } from "./order.service";
import { ProductModel } from "../product/product.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const productId = order.productId;

    const { inventory }: any = await ProductModel.findById(productId);

    if (inventory.inStock === false) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

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
