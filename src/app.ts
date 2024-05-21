import { productRoute } from "./modules/product/product.route";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { orderRoute } from "./modules/order/order.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// routing

// product routes
app.use("/api/products", productRoute);
// order routes
app.use("/api/orders", orderRoute);

// default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Global route
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found`,
  });
});

// error route
app.use((error: unknown, req: Request, res: Response) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
});

export default app;
