import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Logger from "./middlewares/logger";

const app = express();
app.use(cors());

app.set("port", process.env.PORT ?? 3000);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(Logger);

import SetupRoutes from "./routes/main.routes";
SetupRoutes(app);

export default app;