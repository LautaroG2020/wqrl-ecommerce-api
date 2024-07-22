import { Express } from "express";
//import { Roles } from "../models/user.model";
import { checkAuth } from "../middlewares/auth.middleware";
import ProductsController from "../controllers/products.controller";

const SetupProductsRoutes = (app: Express) => {
    app.get("/api/v1/products", checkAuth(), ProductsController.GetAllProductsAsync);
};

export default SetupProductsRoutes;
