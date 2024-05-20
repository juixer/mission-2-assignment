import { productRoute } from "./modules/product/product.route";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { orderRoute } from "./modules/order/order.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// routing
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute)

app.get("/", (req: Request, res: Response) => {
    
  res.send("Hello World!");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Route not found`,
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
});

export default app;
