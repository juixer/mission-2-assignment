// create a new order;

import { Request, Response } from "express";
import { orderService } from "./order.service";
import { ProductModel } from "../product/product.model";

// create a new order
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

// get all orders
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrderFromDB();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
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

// get orders by email
const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await orderService.getOrdersByEmailFromDB(email);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!!",
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
  getAllOrder,
  getOrdersByEmail
};
