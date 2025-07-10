import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const secret:string = process.env.TOKEN_SECRET
const saltRounds = 10;

export function generateAccessToken(info){
  return jwt.sign(info, secret, {expiresIn:"5h"} )
}

export async function generateHashPassword(pass){
    const hashed = await bcrypt.hash(pass, saltRounds)
    return hashed;
}

export async function authenticateUser(hashedPass, incomingPass){
  const result = await bcrypt.compare(incomingPass, hashedPass)
  return result;
}