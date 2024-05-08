const { UserOtpService, VerifyLoginService, SaveProfileService, ReadProfileService } = require("../services/UserServices")


exports.UserOtp = async(req,res) =>{
    const result = await UserOtpService(req)
    return res.status(200).json(result)
      
}
exports.VerifyLogin = async(req,res) =>{
   const result = await VerifyLoginService(req)
   if(result['status']==="success"){
         
     let cookieOption={expires:new Date(Date.now()+24*6060*1000), httpOnly:false}

     // Set Cookies With Response
     res.cookie('token',result['token'],cookieOption)
     return res.status(200).json(result)
   }else{
        return res.status(200).json(result)
   }

}
exports.UserLogout = async(req,res) =>{
        let cookieResponse = {expires: new Date(Date.now()-24*6060*1000),httpOnly:false}
        res.cookie('token','',cookieResponse)
        return res.status(200).json({status:"success"})
}

exports.CreateProfile = async(req,res) =>{
      const result = await SaveProfileService(req)
      return res.status(200).json(result)
}
exports.UpdateProfile = async(req,res) =>{
     const result = await SaveProfileService(req)
     return res.status(200).json(result)
}

exports.ReadProfile = async(req,res) =>{
     let result=await ReadProfileService(req)
    return res.status(200).json(result)
}