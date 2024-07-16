import * as bcrypt from "../helpers/bcrypt.helper";
import { UsersCache } from "../cache/user.cache";
import { User, UserInterface } from "../models/user.model";
class UserService {

    static LoginUserAsync = async (userName: string, password: string) => {
        if (userName == null || password == null) return null;

        const user = (await UsersCache.GetAllUsersAsync())?.find(u => u.Name == userName);
        if (!user) return null;

        const result = await bcrypt.ComparePasswords(password, user.Password ?? "");
        if (result) return user;

        return null;
    };

    static CreateUserAsync = async (userData: UserInterface) => {
        const queryResult = await User.CreateUserAsync(userData);

        return queryResult;
    };
}

export { UserService };