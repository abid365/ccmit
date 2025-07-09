import { Response, Request,NextFunction } from "express"

const testMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    console.log('Foo the middleware')
    next()
}

export default testMiddleware;