const ProfileModel = require("../models/ProfileModel")
const UserModel = require("../models/UserModel")
const EmailSend = require("../utility/EmailHelper")
const { DecodeToken, EncodeToken } = require("../utility/TokenHelper")


exports.UserOtpService = async(req) =>{
   try {
       const email = req.params.email
       const code = Math.floor(100000+Math.random()*900000)
       const EmailText = `Your Verification Code Is ${code}`
       const EmailSubject = 'Email Verification'
       await EmailSend(email,EmailText,EmailSubject)
       await UserModel.updateOne({email:email},{$set:{otp:code}}, {upsert:true} )
       return {status:"status",message:"6 digit OTP has been send"}
   } catch (error) {
      return {status:"Failed" , message:"Something Went Wrong"}
   }
}

exports.VerifyLoginService = async(req) =>{

  try {
   const email = req.params.email
   const otp = req.params.otp
   const total = await UserModel.find({email:email , otp:otp}).count('total')
   if(total===1){
      const user_id = await UserModel.find({email:email , otp:otp}).select('_id')

      const token =  EncodeToken(email,user_id[0]['_id'].toString())

      await UserModel.updateOne({email:email},{$set:{otp:"0"}})

      return {status:"success" , message:"Verify Otp" , token:token}
   }else{
      return {status:"failed" , message:"Otp Failed"}
   }
  } catch (error) {
   return {status:"Failed" , message:error}
  }

}

exports.SaveProfileService = async(req) =>{
      try {
         let user_id = req.headers.user_id;
         let reqBody = req.body;
         reqBody.userID  = user_id;
         await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
         return {status:"Success",message:"Profile Data Save Success"};
      } catch (error) {
         return {status:"Failed" , message:error}
      }
}

exports.ReadProfileService = async(req) =>{
   try {
      let user_id=req.headers.user_id;
      let result= await ProfileModel.find({userID:user_id})
      return {status:"success", data:result}
  }catch (e) {
      return {status:"fail", message:"Something Went Wrong"}
  }
}