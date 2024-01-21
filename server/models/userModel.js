import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const UserModel = mongoose.Schema({
   name: {
    type: String,
    required: true,
   },
   email: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true,
   },
   isAdmin: {
     type: Boolean,
     required: true,
     default : false
   },
   isVerified: {
    type: Boolean,
    default : false,
   }
}, {
    timestamps: true,
})

UserModel.methods.matchPassword = async function(enteredPassword) {
   return bcrypt.compare(enteredPassword, this.password)
}
UserModel.pre('save', async function(next) {
   if(!this.isModified('password')) {
    next()
   }
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password,salt)
}) 
const User = mongoose.models.User || mongoose.model('User', UserModel)
export default User;