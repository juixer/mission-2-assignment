import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const addProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

export const productService = {
    addProductIntoDB
};
