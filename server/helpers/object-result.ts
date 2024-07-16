import { Response } from "express";
import { httpStatusCodes } from "./status-codes";

class ObjectResult {
    Value: any;
    StatusCode: number;

    constructor(value: any = {}, statusCode: number = httpStatusCodes.INTERNAL_SERVER) {
        this.Value = value;
        this.StatusCode = statusCode;
    }

    Ok = (value: any) => {
        this.StatusCode = httpStatusCodes.OK;
        this.Value = value;
    };

    BadRequest = () => this.StatusCode = httpStatusCodes.BAD_REQUEST;
    NotFound = () => this.StatusCode = httpStatusCodes.NOT_FOUND;
    InternalServer = () => this.StatusCode = httpStatusCodes.INTERNAL_SERVER;

    Response = (res: Response) => {
        if (res == null)
            throw new Error("res can't be null or undefined!");
        if ([this.StatusCode, this.Value].some(e => e == null))
            throw new Error("Can't do the res, some prop is null or undefined!");

        res.status(this.StatusCode).json(this.Value);
    };

    static Validation(res: Response) {
        if (res == null) throw new Error("res can't be null or undefined!");
    }

    static SendOk = (res: Response, json: any = {}) => {
        ObjectResult.Validation(res);
        res.status(httpStatusCodes.OK).json(json);
    };

    static SendNotFound = (res: Response, json: any = {}) => {
        ObjectResult.Validation(res);
        res.status(httpStatusCodes.NOT_FOUND).json(json);
    };

    static SendInternalServer = (res: Response, json: any = {}) => {
        ObjectResult.Validation(res);
        res.status(httpStatusCodes.INTERNAL_SERVER).json(json);
    };

    static SendBadRequest = (res: Response, json: any) => {
        ObjectResult.Validation(res);
        res.status(httpStatusCodes.BAD_REQUEST).json(json);
    };

    static SendUnauthorized = (res: Response, json: any) => {
        ObjectResult.Validation(res);
        res.status(httpStatusCodes.UNAUTHORIZED).json(json);
    };
}

export { ObjectResult };
