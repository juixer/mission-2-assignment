import express, { Request, Response } from 'express';

const route = express.Router();

route.get('/products', (req : Request, res : Response) => {
    res.send('products')
})


export const productRoute = route;