import User from '../models/userModel.js'
import asyncHandler from '../midllewares/asyncHandler.js'
import geneateToken from '../utils/generateToken.js';
import EmailVerificationToken from '../models/emailVerificationTokenModel.js';
import crypto from 'crypto'
import nodemailer from 'nodemailer'
const loginUser = asyncHandler (async(req,res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
       geneateToken(user._id, res)
       res.json({
        _id: user._id,
        name: user.name,
        email:user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
       })
    }else {
        res.status(404)
        throw new Error('Invalid email or password')
    }
})
const registerUser = asyncHandler (async(req,res)=> {
  const {name, email, password} = req.body;
  const userExists = await User.findOne({email});
  if(userExists) {
      res.status(401)
      throw new Error('user already exists!')
  }
  const user = await User.create({
      name, email, password
  })
  if(user) {
      geneateToken(user._id, res)
      const token= crypto.randomBytes(36).toString('hex');
      await  EmailVerificationToken.create({
      user: user._id,
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
        from :'soufianehmamou92@gmail.com',
        to: user.email,
        html: `<>
          <h1>Please verify your email by clicking the link below<h1>
          <a href='http://localhost:3000/verify?token=${token}&userId=${user._id}'>verify now</a>
        </>`

      })
      res.status(201).json({
          _id: user._id,
          name: user.name,
          email:user.email,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified
      })
  }else {
       res.status(400)
       throw new Error('invalid user credentials')
  }})
  
  
const logoutUser = asyncHandler( async(req,res)=> {
    res.cookie('jwt', '', {
         httpOnly: true,
         expires:  new Date(0),
    })
    res.status(200).json({message: 'user logged out successfuly'})
}
)












const getUserProfile = asyncHandler( async(req,res)=> {
    const user = await User.findById(req.user._id)
    if(user) {
         res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified
         });
    }else {
        res.status(404)
        throw new Error('user not found')
    }
})
const updateUserProfile = asyncHandler( async(req,res)=> {
    const user = await User.findById(req.user._id)
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password || user.password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isVerified: updatedUser.isVerified
        })
    }else {
        res.status(404)
        throw new Error('user not found')
    }
})
const deleteUser = asyncHandler( async(req,res)=> {
   const user = await User.findById(req.params.id)
   if(user) {
      if(user.isAdmin) {
         res.status(400)
         throw new Error('admin users cannot be deleted')
      }
      await User.deleteOne({_id: user._id})
      res.status(200).json({message:'user deleted'})
   }else {
    res.status(404)
    throw new Error('user not found')
   }
})
const updateUser = asyncHandler( async(req,res)=> {
    const user = await User.findById(req.params.id)
    if(user) {
        user.name =  req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isVerified: updatedUser.isVerified
        })
    }else {
        res.status(404)
        throw new Error('user not found')
    }
})
const getUsers = asyncHandler( async(req,res)=> {
   const users = await User.find({}).select('-password')
   if(users) {
      res.status(200).json(users)
   }else {
    res.status(404)
    throw new Error('no user found')
   }
})
const getUserById = asyncHandler (async(req,res)=> {
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
        res.status(200).json(user)
    }else {
        res.status(404)
        throw new Error('user not found')
    }
})


export {
    getUserById,getUserProfile,getUsers,
    updateUser,updateUserProfile,deleteUser,
    registerUser,loginUser,logoutUser,
    
}