import { Express } from "express";
import UserController from "../controllers/user.controller";

const SetupUserRoutes = (app: Express) => {
    app.post("/api/v1/users/login", UserController.Validate("login"), UserController.UserLoginAsync);

    app.post("/api/v1/users/create", UserController.Validate("create"), UserController.UserCreateAsync);
};

export default SetupUserRoutes;
