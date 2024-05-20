import { productRoute } from "./modules/product/product.route";
import express, { Request, Response } from "express";
import cors from 'cors';
const app = express();

// parser
app.use(express.json());
app.use(cors());

// routing
app.use('/api', productRoute)

app.get("/", (req : Request, res : Response) => {
  res.send("Hello World!");
});

export default app;
