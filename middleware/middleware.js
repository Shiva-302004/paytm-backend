const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY
const isSignin=async(req,res,next)=>{
    const token=req.headers.token
    const data=jwt.verify(token,JWT_SECRET_KEY)
    req.user=data.user
    next()
}
module.exports={isSignin}