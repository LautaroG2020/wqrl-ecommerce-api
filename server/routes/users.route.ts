import { Express } from "express";
import { Roles } from "../models/user.model";
import { checkAuth } from "../middlewares/auth.middleware";
import UserController from "../controllers/users.controller";

const SetupUserRoutes = (app: Express) => {
    app.post("/api/v1/users/login", UserController.Validate("login"), UserController.UserLoginAsync);

    app.post("/api/v1/users/create", checkAuth([Roles.Admin]), UserController.Validate("create"), UserController.UserCreateAsync);

    app.patch("/api/v1/users/edit", checkAuth(), UserController.UserEditAsync);

    app.delete("/api/v1/users/delete/:id", checkAuth([Roles.Admin]), UserController.DeleteUserAsync);

};

export default SetupUserRoutes;
