import { Express } from "express";
import { Roles } from "../models/user.model";
import { checkAuth } from "../middlewares/auth.middleware";
import ProductsController from "../controllers/products.controller";

const SetupProductsRoutes = (app: Express) => {
    app.get("/api/v1/products", checkAuth(), ProductsController.GetAllProductsAsync);

    app.get("/api/v1/products/:id", checkAuth(), ProductsController.GetProductByIdAsync);

    app.delete("/api/v1/products/:id", checkAuth([Roles.Bussines, Roles.Admin]), ProductsController.DeleteProductAsync);
};

export default SetupProductsRoutes;
