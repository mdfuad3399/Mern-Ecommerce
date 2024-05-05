const jwt = require("jsonwebtoken")



exports.EncodeToken = (email,user_id) =>{
    const KEY = "123-abc-xyz"
    const EXPAIRE = {expiredIn : '24h'}
    const PAYLOAD = {email:email , user_id:user_id}
    return jwt.sign(PAYLOAD,KEY,EXPAIRE)
}

exports.DecodeToken = (token) =>{
      try {
            const KEY = "123-abc-xyz"
            return jwt.verify(token,KEY)
      } catch (error) {
        return null
      }
}