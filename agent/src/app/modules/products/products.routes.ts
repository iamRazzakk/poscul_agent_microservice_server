import { Router } from "express";
import { ProductsController } from "./products.controller";

const productRoute = Router();
productRoute.route("/").post(ProductsController.productCreate)
    .get(ProductsController.getAllProducts);

export const ProductsRoutes = productRoute;
