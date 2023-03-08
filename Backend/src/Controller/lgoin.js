const JWT = require('jsonwebtoken');
const Config = require("../config/config");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(Config.cryptR.secret)

LoginToken = (data) => {
    return JWT.sign(
      {
        sub: data.id,
        name: data.email,
        user: true,
        iat: Math.round(new Date().getTime() / 1000),
        exp: Math.round(new Date().getTime() / 1000) + 24 * 60 * 60,
      },
      Config.jwt.secret
    );
  };

module.exports ={

    login: async (req,res,next)=>{
        // console.log("req-----login",req.user.id)
        const {id,email,password}= req.user
        if(id && email && password){
            let data ={
                id: cryptr.encrypt(id),
                email:cryptr.encrypt(email)
            }
            const token = LoginToken(data)
            res.status(200).json({status:1,token})
        }else{
            let err_data = { password: "Invalied login details" };
            return res.status(400).json({ status: 2, errors: err_data });   
        }
    }
}