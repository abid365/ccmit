import "dotenv/config"
import { Router, Request, Response } from "express";
import multer from "multer"
import prisma from "../utils/prisma.client";
import { generateAccessToken, generateHashPassword, authenticateUser } from "../utils/auth.utils";

const route = Router()
const storage = multer.memoryStorage(); 
const upload = multer({ storage });


route.post("/auth/register",upload.any(), async(req:Request, res:Response)=>{
   const {name, email, password, phone, role, institute, isAdmin} = req.body
   const hashedPassword = await generateHashPassword(password)
   const info = {
    name,
    email,
    phone,
    role,
    password:hashedPassword,
    institute,
    is_admin:isAdmin
   }
   
  try {
     const user = await prisma.user.create({data:info})
    res.json(
       {"message":"User created successfully", "status":200}
    )
  } catch (error) {
    console.log(error)
    res.json({
        "error":error
    })
  }
})

route.post("/auth/login", upload.any(), async(req:Request,res:Response)=>{
  console.log(req.body)
  const {email, password} = req.body;
  const user = await prisma.user.findFirst({where:{email:email}})
  try {
    if(authenticateUser(user.password, password)){
    const token = generateAccessToken(user)
    res.json({
      "message":"authenticated", 
      "status":200,
      "token":token
    })
    
  }else{
    res.json({"message":"Failed to authenticate"})
  }
  } catch (error) {
    console.log(error)
    res.json({
      "message":"Account not found",
        "error":error
    })
  }
})


export default route