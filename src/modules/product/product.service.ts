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
};

// update product in DB
const updateProductInDB = async (productId: string, updateData: any) => {
  const result = await ProductModel.findByIdAndUpdate(
    productId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  return result;
};

// delete product from DB
const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};

// search product in DB

const searchProductInDB = async (searchTerm: string) => {
    const regex = new RegExp(searchTerm, "i");
    const result = await ProductModel.find({
        $or:[
            {name: {$regex:regex}},
            {description: {$regex:regex}},
            {category: {$regex:regex}},
        ]
    });
    return result;
  };

export const productService = {
  addProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
  searchProductInDB,
};
