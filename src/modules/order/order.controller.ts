// create a new order;

import { Request, Response } from "express";
import { orderService } from "./order.service";
import { ProductModel } from "../product/product.model";
import { Product } from "../product/product.interface";
import orderValidationSchema from "./order.validation";

// create a new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const { error, value } = orderValidationSchema.validate(order);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.details,
      });
    }

    const productId = value.productId;
    const product = (await ProductModel.findById(productId)) as Product;

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

    const result = await orderService.createOrderIntoDB(value);
    res.status(200).json({
      success: true,
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
  getOrdersByEmail,
};
