import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const addProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

export const productService = {
  addProductIntoDB,
  getProductsFromDB,
};
