import connection from "../data/database-config";
import { GetSafeString } from "../utils/functions.utils";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { EncryptPasswordAsync } from "../helpers/bcrypt.helper";

interface UserInterface {
    name: string;
    email: string;
    password: string;
    roleId: number;
}

class User {
    Name: string = "";
    Email: string | undefined = "";
    Password: string = "";
    RoleId: number = 0;

    constructor(data: UserInterface) {
        if (data == null) return;

        this.Name = GetSafeString(data.name);
        this.Email = GetSafeString(data.email);
        this.Password = GetSafeString(data.password);
        this.RoleId = data.roleId;
    }

    static GetUsersFromDBAsync = async () => {
        const query = `
            SELECT * FROM e_commerce.users
        `;

        const [rows] = await connection.query<RowDataPacket[]>(query);

        const result: User[] = rows.map(record => {
            const user = new User(record as UserInterface);
            return user;
        });

        return result;
    };

    static CreateUserAsync = async (userData: UserInterface) => {
        const { name, email, password, roleId } = userData;
        const bcryptedPassword = await EncryptPasswordAsync(password);
        const query = `
                INSERT INTO e_commerce.users (name, email, password, roleId)
                VALUES (?, ?, ?, ?)
         `;

        return connection.query<ResultSetHeader>(query, [name, email, bcryptedPassword, roleId])
            .then(([result]) => {
                return result.affectedRows;
            })
            .catch(error => {
                console.error(`Error al ejecutar la consulta: ${error.message}`);
                return 0;
            });
    };
}

export {
    User,
    UserInterface
};