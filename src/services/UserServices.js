const UserModel = require("../models/UserModel")
const EmailSend = require("../utility/EmailHelper")


exports.UserOtpService = async(req) =>{
   try {
       const email = req.params.email
       const code = Math.floor(100000+Math.random()*900000)
       const EmailText = `Your Verification Code Is ${code}`
       const EmailSubject = 'Email Verification'
       await EmailSend(email,EmailText,EmailSubject)
       await UserModel.updateOne({email:email},{$set:{otp:code}}, {upsert:true} )
       return {status:"status",message:"6 digit OTP has beeb send"}
   } catch (error) {
      return {status:"Failed" , message:"Something Went Wrong"}
   }
}

exports.VerifyLoginService = async() =>{

   const email = req.params.email
   const otp = req.params.otp
   const total = await UserModel.find({email:email , otp:otp}).count('total')
   return {status:"success" , message:total}

}
exports.UserLogoutService = async() =>{

}
exports.CreateProfileService = async() =>{

}
exports.UpdateProfileService = async() =>{

}
exports.ReadProfileService = async() =>{

}