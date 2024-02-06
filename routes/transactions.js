const express=require('express')
const router=express.Router()
const {isSignin}=require("../middleware/middleware")
const { AddMoney, SendMoney } = require('../controller/transactionController')
router.post("/addmoney",isSignin,AddMoney)
router.post("/sendmoney/:id",isSignin,SendMoney)
module.exports=router