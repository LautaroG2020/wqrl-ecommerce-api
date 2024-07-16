import mysql from "mysql2/promise";
import Log from "../utils/log";

const SQL_DATABASE_USERNAME = process.env.DB_USER;
const SQL_DATABASE_PASSWORD = process.env.DB_PASSWORD;
const SQL_DATABASE_SERVER = process.env.DB_SERVER;
const SQL_DATABASE_NAME = process.env.DB_NAME;

const configSQL = {
    host: SQL_DATABASE_SERVER,
    user: SQL_DATABASE_USERNAME,
    password: SQL_DATABASE_PASSWORD,
    database: SQL_DATABASE_NAME,
};

Log.BgGreen(`configSQL.server: ${configSQL.host}`);
Log.BgGreen(`DB server name: ${configSQL.database}`);

const connection = mysql.createPool(configSQL);

export default connection;
