import * as bcrypt from "../helpers/bcrypt.helper";
import { User, UserInterface } from "../models/user.model";
class UserService {

    static LoginUserAsync = async (userName: string, password: string) => {
        if (userName == null || password == null) return null;

        const users = await User.GetUsersAsync();
        const user = users.find(u => u.Name === userName);
        if (!user) return null;

        const result = await bcrypt.ComparePasswords(password, user.Password ?? "");
        if (result) return user;

        return null;
    };

    static CreateUserAsync = async (userData: UserInterface) => {
        const queryResult = await User.CreateUserAsync(userData);

        return queryResult;
    };

    static UpdateUserAsync = async (userData: UserInterface) => {
        const queryResult = await User.UpdateUserAsync(userData);

        return queryResult;
    };

    static DeleteUserAsync = async (userId: number) => {
        const queryResult = await User.DeleteUserAsync(userId);

        return queryResult;
    };
}

export { UserService };