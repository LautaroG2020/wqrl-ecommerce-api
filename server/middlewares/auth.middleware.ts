import * as jwt from "../helpers/jwt.helper";
import { ObjectResult } from "../helpers/object-result";
import { Request, Response, NextFunction } from "express";

const checkAuth = (roles: number[] = []) => async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers["authorization"] as string;

    const user = jwt.GetUserFromToken(accessToken);
    if (user == null) return ObjectResult.SendUnauthorized(res, "Token inválido.");

    if (roles.length === 0 || roles.includes(user.RoleId)) return next();

    return ObjectResult.SendUnauthorized(res, "Se requieren permisos especiales para consumir este servicio.");
};

export { checkAuth };