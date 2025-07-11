import express, { Request, Response } from "express"
import userService from "../services/user.service"


const route = express.Router()

route.get("/users", async(req: Request, res: Response) => {
    res.json({
        "hello":"hello"
    })
})

route.post("/users", userService.postUser)
route.put("/users/:id",async(req,res)=>{
    console.log(req.params.id)
    res.end()
})


export default route