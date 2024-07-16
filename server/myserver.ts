import { createServer, Server } from "http";
import app from "./app";
import Log from "./utils/log";

const httpType: string = "http";
const port: number = app.get("port");
const server: Server = createServer(app);

server.listen(port, async () => {
    const msg: string = `Servidor corriendo en ${httpType}://localhost:${port}`;
    Log.BgGreen(msg);
});