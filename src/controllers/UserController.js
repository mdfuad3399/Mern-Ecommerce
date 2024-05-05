const { UserOtpService, VerifyLoginService } = require("../services/UserServices")


exports.UserOtp = async(req,res) =>{
    const result = await UserOtpService(req)
    return res.status(200).json(result)
      
}
exports.VerifyLogin = async(req,res) =>{
   const result = await VerifyLoginService(req)
   return res.status(200).json(result)
}
exports.UserLogout = async(req,res) =>{

}
exports.CreateProfile = async(req,res) =>{

}
exports.UpdateProfile = async(req,res) =>{

}
exports.ReadProfile = async(req,res) =>{

}