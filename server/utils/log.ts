import colors from "colors";

class Log {
    static Request(req: any): void {
        Log.Green("############################################################################");
        Log.Green(`New request: ${req.method}:${req.url}`);
        Log.Green(`From IP: ${req.socket.remoteAddress}--${req.connection.remoteAddress}`);
        Log.Green(`user-agent: ${req.headers["user-agent"]}`);
        Log.Green(`host: ${req.headers["host"]}`);
        Log.Green(`origin: ${req.headers.origin}`);
        Log.Green(req.body);
        Log.Green(new Date().toLocaleString());
    }

    static EndRequest(res: any, miliseconds: number): void {
        Log.Yellow(`End request: [${res.statusCode}] [${(miliseconds / 1000).toFixed(3)}ms]`);
        Log.Yellow("############################################################################");
    }

    static Red(...params: Array<any>): void {
        for (let i = 0; i < params.length; i++) {
            const element = params[i];
            if (typeof element == "object") {
                for (const key in element)
                    // eslint-disable-next-line no-prototype-builtins
                    if (element.hasOwnProperty(key)) console.log(colors.red(`key: ${key}, value: ${element[key]}`));

                continue;
            }

            console.log(colors.red(element));
        }
    }

    static Blue(_Texto: string): void {
        console.log(colors.blue(_Texto));
    }

    static Green(_Texto: string): void {
        console.log(colors.green(_Texto));
    }

    static Yellow(_Texto: string): void {
        console.log(colors.yellow(_Texto));
    }

    static Cyan(...params: any[]): void {
        params.forEach(element => {
            console.log(colors.cyan(element));
        });
    }

    static Magenta(...params: string[]): void {
        params.forEach(element => {
            console.log(colors.magenta(element));
        });
    }

    static BgGreen(_Texto: string): void {
        console.log(colors.bgGreen.black(_Texto));
    }

    static BgRed(...params: string[]): void {
        params.forEach(element => {
            console.log(colors.bgRed.black(element));
        });
    }
    static BgCyan(...params: string[]): void {
        params.forEach(element => {
            console.log(colors.bgCyan.black(element));
        });
    }
}

export default Log;