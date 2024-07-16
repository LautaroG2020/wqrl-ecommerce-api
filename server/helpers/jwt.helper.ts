import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

interface UserPayload {
    user: User;
}

const GetNewToken = (user: User) => {
    if (!JWT_SECRET) return null;

    return jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const GetUserFromToken = (token: string | null): User | null => {
    if (!JWT_SECRET || token === null) {
        return null;
    }

    let result: User | null = null;
    jwt.verify(token, JWT_SECRET, (err, userPayload) => {
        if (!err)
            result = (userPayload as UserPayload).user;
    });
    return result;
};

export { GetNewToken, GetUserFromToken };
