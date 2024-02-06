const {hashedpassword,comparepassword}=require("../helper/authhelper")
const validator=require('validator')
const model=require("../models/authmodel")
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")
dotenv.config()
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY
const signupController=async(req,res)=>{
    // console.log(req.user)
    const {name,email,password,phone,upipin}=req.body
    if(!name) res.status(200).json({msg:"name is required"})
    if(!email) res.status(200).json({msg:"email is required"})
    if(!password) res.status(200).json({msg:"password is required"})
    if(!phone) res.status(200).json({msg:"phone is required"})
    if(!upipin) res.status(200).json({msg:"upipin is required"})
    try{
        if(validator.isEmail(email)){
            const newuser=await model.findOne({email})
            if(newuser){
                res.status(200).json({
                    msg:"please try with another email"
                })
            }else{
                if(upipin.length>6){
                    res.status(200).json({
                        msg:"upipin should hsve length of 6"
                    })
                }else{
                    const pass=await hashedpassword(password)
                    const upi=await hashedpassword(upipin)
    
                    const user=new model({name,email,password:pass,phone,upipin:upi})
                    const data=await user.save()
                    const payload={
                        user:{
                            id:data._id
                        }
                    }
                    const token=await jwt.sign(payload,JWT_SECRET_KEY)
                    res.status(200).json({
                        success:true,
                        msg:"user registred successfully",
                        token:token,
                        name:data.name,
                        data:data
                    })
                }
            }
        }else{
            res.status(200).json({
                msg:"this field is required",
                success:false
            })
        }
    }catch(err){
            res.status(400).json({
                msg:"error in signup please try again",
                success:false
            })
    }
}
const loginController=async(req,res)=>{
    // let emailphone=req.body.emailphone
        const {emailphone,password}=req.body
        
        try{
            if(!emailphone) res.status(200).json({msg:"email/phone is required"})
            if(!password) res.status(200).json({msg:"password is required"})
            const data=await model.findOne({$or:[{email:emailphone},{phone:emailphone}]})
        console.log(data)
            if(data){
                const isCompare= comparepassword(data.password,password)
                if(!isCompare){
                    res.status(400).json({
                        msg:"invalid credentials"
                    })
                }else{
                    const payload={
                        user:{
                            id:data._id
                        }
                    }
                    const token=await jwt.sign(payload,JWT_SECRET_KEY)
                    res.status(200).json({
                        msg:"login successful",
                        success:true,
                        name:data.name,
                        amount:data.amount,
                        id:data._id,
                        token:token
                    })
                }
            }else{
                res.status(200).json({
                    success:false,
                    msg:"error while login please login with another email"
                })
            }
        }catch(err){
            res.status(400).json({
                msg:"error in signup please try again",
                success:false
            })
        }
}
const getallusers=async(req,res)=>{
        try{
            if(req.user.id){
                const data=await model.find({}).select({name:1,_id:1,phone:1})
                res.status(200).json({
                    success:true,
                    data:data
                })
            }
        }catch(err){
            res.status(400).json({
                msg:"error in fecthing all user please try again",
                success:false
            })  
        }
}
const selecteduser=async(req,res)=>{
    const {keyword}=req.params
    const data=await model.find({$or:[{name:{$regex:keyword}},{phone:{$regex:keyword}}]})
    res.status(200).json({
        data:data
    })
}
module.exports={signupController,loginController,getallusers,selecteduser}