import express, { Request, Response } from 'express';
import { productController } from './product.controller';

const route = express.Router();

route.post('/products', productController.createProduct)
route.get('/products',productController.getProducts)
route.get('/products/:productId',productController.getProductById)


export const productRoute = route;