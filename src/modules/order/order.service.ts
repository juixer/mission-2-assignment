// create order into db

import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

export const orderService = {
    createOrderIntoDB,
};
