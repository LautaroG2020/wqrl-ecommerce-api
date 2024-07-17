import { Express } from "express";
import { Roles } from "../models/user.model";
import { checkAuth } from "../middlewares/auth.middleware";
import UserController from "../controllers/user.controller";

const SetupUserRoutes = (app: Express) => {
    app.post("/api/v1/users/login", UserController.Validate("login"), UserController.UserLoginAsync);

    app.post("/api/v1/users/create", checkAuth([Roles.Admin]), UserController.Validate("create"), UserController.UserCreateAsync);

};

export default SetupUserRoutes;
