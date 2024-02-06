const express=require('express')
const route=express.Router()
const {isSignin}=require("../middleware/middleware")
const {signupController,loginController, getallusers, selecteduser}=require("../controller/authcontroller")
route.post("/signup",signupController)
route.post("/login",loginController)
route.get("/alluser",isSignin,getallusers)
route.get("/allusers/:keyword",isSignin,selecteduser)
module.exports=route