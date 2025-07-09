import { Router, Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const route = Router()

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_haram';


route.post("/auth", async(req:Request, res:Response)=>{
    console.log(req.body)
    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
    const checkPass = await bcrypt.compare(myPlaintextPassword,hash)
    console.log(hash)
    console.log(checkPass)
    res.json(
       {"message":"sucess"}
    )
})


export default route