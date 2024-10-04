import jwt from 'jsonwebtoken'
import { createError } from '../error/error.js';
import dotenv from 'dotenv'
import User from '../models/User.js';
dotenv.config()
const verifyToken = async (req , res ,next)=>{
       const token = req.cookies.access_token;
       if(!token) return next(createError(401 , 'You are not authenticated '))
       const validToken =  jwt.verify(token , process.env.JWT_SECRET )
       const user = await User.findById(validToken.id)
       if(user){
              req.user = user
              next()
       }else{
              next(createError(403 , 'Token is not valid '))
       }
}

export {verifyToken}