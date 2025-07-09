import { Request,Response } from "express"

 const postUser = async (req:Request,res:Response)=>{
    console.log(req.body)
    res.json(req.body)
}   


const userService = {
    postUser: postUser
}

export default userService