const  {DecodeToken} = require('../utility/TokenHelper')
module.exports= (req,res,next) =>{
    const token = req.headers['token']
    if(!token){
        token = req.cookies['token']
    }
    const decoded = DecodeToken(token)
    if(decoded===null){
        return res.status(401).json({status:"Failed",message:unauthorized})
    }else{
         const email =decoded['email']
         const user_id =decoded['user_id']
         req.headers.email = email
         req.headers.user_id = user_id
         next()
    }
}