import { Response, Request,NextFunction } from "express"


declare module 'express-serve-static-core' {
    interface Request {
        time?: string;
    }
}

const testMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    console.log('Foo the middleware')
    next()
}


   
const logger = async(req:Request, res:Response, next:NextFunction)=>{
    req.time = new Date(Date.now()).toString();
    
    // ANSI color codes
    const colors = {
        reset: '\x1b[0m',
        bright: '\x1b[1m',
        dim: '\x1b[2m',
        underscore: '\x1b[4m',
        blink: '\x1b[5m',
        reverse: '\x1b[7m',
        hidden: '\x1b[8m',
        
        // Foreground colors
        fg: {
            black: '\x1b[30m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m',
            crimson: '\x1b[38m'
        },
        // Background colors
        bg: {
            black: '\x1b[40m',
            red: '\x1b[41m',
            green: '\x1b[42m',
            yellow: '\x1b[43m',
            blue: '\x1b[44m',
            magenta: '\x1b[45m',
            cyan: '\x1b[46m',
            white: '\x1b[47m',
            crimson: '\x1b[48m'
        }
    };

    // Color-coded log
    console.log(
        `${colors.bg.cyan}${req.method}${colors.reset}`,
        `${colors.bg.yellow}${req.hostname}${colors.reset}`,
        `${colors.bg.crimson}${req.path}${colors.reset}\n`+
        `${colors.fg.magenta}${req.time}${colors.reset}`
    );
    next();
}

const middleWares = {

    testMiddleware,
    logger
}

export default middleWares;