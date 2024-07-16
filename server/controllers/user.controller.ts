import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ObjectResult } from "../helpers/object-result";
import { UserService } from "../services/user.services";
import { GetNewToken } from "../helpers/jwt.helper";
import { UserInterface } from "../models/user.model";

class UserController {
    static UserLoginAsync = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            ObjectResult.SendBadRequest(res, {
                message: "Invalid parameters!",
                errors: errors.array()
            });
            return;
        }

        const { userName, password } = req.body;
        const user = await UserService.LoginUserAsync(userName, password);

        if (user != null) {
            const userToReturn = JSON.parse(JSON.stringify(user));
            delete userToReturn.Password;
            userToReturn.token = GetNewToken(user);
            ObjectResult.SendOk(res, userToReturn);
            return;
        }

        ObjectResult.SendNotFound(res, "Datos inválidos!");
    };

    static UserCreateAsync = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            ObjectResult.SendBadRequest(res, {
                message: "Invalid parameters!",
                errors: errors.array()
            });
            return;
        }

        const body: UserInterface = req.body;
        const queryResult = await UserService.CreateUserAsync(body);

        if (queryResult < 1) return ObjectResult.SendBadRequest(res, "No se pudo crear el usuario");

        return ObjectResult.SendOk(res, "Usuario generado correctamente");
    };

    static Validate = (method: string) => {
        switch (method) {
            case "login": {
                return [
                    body("userName", "userName param should be a valid string").notEmpty(),
                    body("password", "password param should be a valid string").notEmpty(),
                ];
            }
            case "create": {
                return [
                    body("name", "userName param should be a valid string").notEmpty(),
                    body("email", "password param should be a valid string").notEmpty(),
                    body("password", "email param should be a valid string").notEmpty(),
                    body("roleId", "roleID param should be a valid number").isNumeric(),
                ];
            }
            case "edit-password": {
                return [
                    body("currentPassword", "currentPassword param should be a valid string").notEmpty(),
                    body("newPassword", "newPassword param should be a valid string").notEmpty(),
                ];
            }
            default: {
                return [];
            }
        }
    };
}
export default UserController;