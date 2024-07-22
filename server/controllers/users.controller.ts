import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ObjectResult } from "../helpers/object-result";
import { UserService } from "../services/users.services";
import { GetNewToken } from "../helpers/jwt.helper";
import { UserInterface } from "../models/user.model";

class UserController {
    static UserLoginAsync = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return ObjectResult.SendBadRequest(res, { message: "Invalid parameters!", errors: errors.array() });

        const { userName, password } = req.body;
        const user = await UserService.LoginUserAsync(userName, password);

        if (!user) return ObjectResult.SendNotFound(res, "Datos inválidos!");

        const userToReturn = JSON.parse(JSON.stringify(user));
        delete userToReturn.Password;
        userToReturn.token = GetNewToken(user);

        return ObjectResult.SendOk(res, userToReturn);
    };

    static UserCreateAsync = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return ObjectResult.SendBadRequest(res, { message: "Invalid parameters!", errors: errors.array() });

        const body: UserInterface = req.body;
        const queryResult = await UserService.CreateUserAsync(body);

        if (queryResult < 1) return ObjectResult.SendBadRequest(res, "No se pudo crear el usuario");

        return ObjectResult.SendOk(res, "Usuario generado correctamente");
    };

    static UserEditAsync = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return ObjectResult.SendBadRequest(res, { message: "Invalid parameters!", errors: errors.array() });

        const userData: UserInterface = req.body;
        const queryResult = await UserService.UpdateUserAsync(userData);

        if (queryResult < 1) return ObjectResult.SendBadRequest(res, "No se pudo actualizar el usuario");

        return ObjectResult.SendOk(res, "Usuario actualizado correctamente");
    };

    static DeleteUserAsync = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) return ObjectResult.SendBadRequest(res, "Invalid parameters!");

        const queryResult = await UserService.DeleteUserAsync(userId);

        if (queryResult < 1) return ObjectResult.SendBadRequest(res, "No se pudo eliminar el usuario");

        return ObjectResult.SendOk(res, "Usuario eliminado correctamente");
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
            default: {
                return [];
            }
        }
    };
}
export default UserController;