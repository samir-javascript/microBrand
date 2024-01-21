import EmailVerificationToken from "../models/emailVerificationTokenModel.js";
import { isValidObjectId } from "mongoose";
import User from '../models/userModel.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import asyncHandler from "../midllewares/asyncHandler.js";
const verifyToken = asyncHandler(async (req,res)=> {

    const {token, userId} = req.body;
    try {
        if(!isValidObjectId(userId) || !token) {
            res.status(401)
            throw new Error('Invalid userId or token')
        }
        const verify = await EmailVerificationToken.findOne({user:userId});
        if(!verify) {
            res.status(401)
            throw new Error('Invalid token!')
        }
        const isMatch = await verify.compareToken(token);
        if(!isMatch) {
            res.status(401)
            throw new Error('Token does not match!')
        }
        await User.findByIdAndUpdate(userId,{isVerified:true});
        await EmailVerificationToken.findByIdAndDelete(verify._id)
        res.status(200).json({message: 'your email has been verified'})    
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('failed to verify token, something went wrong!')
    }
   
})

const revirifyEmail = asyncHandler( async (req, res)=> {
    try {
  const userId = req.user._id;


  if(!isValidObjectId(userId)) return res.status(401).json({message: 'Invalid userId'});
  console.log(userId)
   const user = await User.findById(userId) 
   if(!user) return  res.status(401).json({message: 'Invalid request, user not found'});
   if(user.isVirefied) return  res.status(401).json({error: 'Invalid request, user is already verified'});
   
   const token= crypto.randomBytes(36).toString('hex');
   EmailVerificationToken.create({
   user: userId,
   token
  })
  const transport = nodemailer.createTransport({
     host: "sandbox.smtp.mailtrap.io",
     port: 2525,
     auth: {
       user: "e2cfa2c251a687",
       pass: "baaa072a615703"
     }
   });
   await transport.sendMail({
     //profile: {name:user.name, email: user.email},

     from :'soufianehmamou92@gmail.com',
     to: user.email,
     html: `<>
       <h1>Please verify your email by clicking the link below<h1>
       <a href='http://localhost:3000/verify?token=${token}&userId=${userId}'>verify now</a>
     </>`

   })
     res.status(201).json({message: "check your inbox!"})
} catch (error) {
  console.log(error)
  res.status(500)
  throw new Error(error)
}

}
)
export {
    verifyToken, revirifyEmail
}