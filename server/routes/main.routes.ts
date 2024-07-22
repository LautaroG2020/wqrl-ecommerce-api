import { Express } from "express";
import UserRoutes from "./users.route";
import ProductsRoutes from "./products.routes";

export default (app: Express) => {
    UserRoutes(app);
    ProductsRoutes(app);

    app.get("/", (req, res) => {
        res.status(200).json(`Hello ${process.env.NODE_ENV}! Versión: ${process.env.APP_VERSION}.`);
    });

    app.get("/version", (req, res) => {
        res.status(200).json(`Hello ${process.env.NODE_ENV}! Versión: ${process.env.APP_VERSION}.`);
    });

    app.get("*", (req, res) => {
        console.log(__dirname + req.url);
        res.status(404).json("Get out of here!");
    });

    console.log("Routes imported!");
};