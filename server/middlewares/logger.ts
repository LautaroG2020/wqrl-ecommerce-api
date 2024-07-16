import { Request, Response, NextFunction } from "express";
import Log from "../utils/log";
import { isStaticFile } from "../helpers/constants.helper";

export default (req: Request, res: Response, next: NextFunction) => {
    if (isStaticFile(req.url)) {
        next();
        return;
    }

    Log.Request(req);
    const startTime = process.hrtime();

    res.on("finish", () => {
        const totalTime = process.hrtime(startTime);
        const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
        Log.EndRequest(res, totalTimeInMs);
    });

    next();
};
