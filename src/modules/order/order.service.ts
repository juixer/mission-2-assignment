// create order into db

import { Product } from "../product/product.interface";
import { ProductModel } from "../product/product.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

// create order into db
const createOrderIntoDB = async (order: Order) => {
  const id = order.productId;
  const orderQuantity = order.quantity;
  order.price = order.price * orderQuantity;

  const product = (await ProductModel.findById(id)) as Product;

  const { inventory } = product;
  const quantity = inventory.quantity - orderQuantity;
  const inStock = quantity > 0;

  await ProductModel.findByIdAndUpdate(
    id,
    {
      "inventory.quantity": quantity,
      "inventory.inStock": inStock,
    },
    { new: true }
  );

  const result = await OrderModel.create(order);
  return result;
};

// get all orders from db
const getAllOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// get orders by email
const getOrdersByEmailFromDB = async (email: string) => {
  const result = await OrderModel.aggregate([
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
};

export const orderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrdersByEmailFromDB,
};
