import mongoose  from "mongoose";
import bcrypt from "bcryptjs";


const EmailVerificationTokenSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now(),
        expires: 60 * 60 * 24,
    }
})
EmailVerificationTokenSchema.pre('save', async function(next) {
   
   if(!this.isModified('token')) {
     return next()
   }
  const salt = await bcrypt.genSalt(10);
  this.token =  await bcrypt.hash(this.token, salt)

})
EmailVerificationTokenSchema.methods.compareToken =  async function(tokenToCompare) {
    try {
        return await bcrypt.compare(tokenToCompare, this.token)
    } catch (error) {
        console.log(error)
        throw error;
    }
    
}
const EmailVerificationToken = mongoose.models.EmailVerificationToken || mongoose.model('EmailVerificationToken', EmailVerificationTokenSchema);

export default EmailVerificationToken;