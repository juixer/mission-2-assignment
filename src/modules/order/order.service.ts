// create order into db

import { ProductModel } from "../product/product.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

// create order into db
const createOrderIntoDB = async (order: Order) => {
  const id = order.productId;
  const orderQuantity = order.quantity;

  const { price }: any = await ProductModel.findById(id);

  const totalPrice = price * orderQuantity;
  order.price = totalPrice;

  const updateProduct = await ProductModel.findByIdAndUpdate(id, {
    $inc: { "inventory.quantity": -orderQuantity },
  });

  if (updateProduct?.inventory.quantity === 1) {
    await ProductModel.findByIdAndUpdate(id, {
      $set: { "inventory.inStock": false },
    });
  }

  const result = await OrderModel.create(order);
  return result;
};

// get all orders from db
const getAllOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// get orders by email
const getOrdersByEmailFromDB = async (email : string) => {
    const result = await OrderModel.find({email: email});
    return result;
}

export const orderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrdersByEmailFromDB
};
