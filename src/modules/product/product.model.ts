import { Schema } from "mongoose";
import { Product } from "./product.interface";

const productSchema = new Schema<Product>({
    name:{type: String, required:[true, "Please provide a product name"]},
    description:{type: String, required:[true, "Please provide a short description"]},
    price:{type : Number, required:[true, ]}
})

