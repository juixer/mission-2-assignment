import express, { Request, Response } from 'express';
import { productController } from './product.controller';

const route = express.Router();

route.post('/products', productController.createProduct)


export const productRoute = route;