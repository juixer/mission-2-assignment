import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

// create a new Product

const addProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all products from DB
const getProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// get single product from DB
const getSingleProductFromDB = async (productId: string) => {
    const result = await ProductModel.findById(productId);
    return result;
}

export const productService = {
  addProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
};
