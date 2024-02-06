const model=require("../models/authmodel")
const bcryptjs=require("bcryptjs")
const AddMoney=async(req,res)=>{
    console.log(req.user)
    const {deposit,upipin}=req.body
    const data=await model.findOne({_id:req.user.id})
    
    console.log(deposit)
    try{
        const isCompare= bcryptjs.compare(data.upipin,upipin)
        if(isCompare){
            const newdata=await model.findByIdAndUpdate({_id:data._id},{amount:(+data.amount)+(+deposit)},{new:true})
            console.log(newdata)
            res.status(200).json({
                success:true,
                data:newdata
            })
        }else{
            res.status(400).json({
                msg:"enter valid password"
            })
        }
    }catch(err){
        res.status(400).json({msg:"error while adding money"})
    }
}
const SendMoney=async(req,res)=>{
    const {id}=req.params
    const {deposit,upipin}=req.body

    try{
        const user=await model.findOne({_id:req.user.id})
        const user2=await model.findOne({_id:id})
        console.log(user)
        console.log(user2)
        if(deposit>user.amount){
            res.status(400).json({
                msg:"insufficient amount"
            })
        }else{
            const isCompare= bcryptjs.compare(user.upipin,upipin)
            if(isCompare){
                const newdata=await model.findByIdAndUpdate({_id:req.user.id},{amount:(+user.amount)+(-deposit)},{new:true})
                const newdata2=await model.findByIdAndUpdate({_id:id},{amount:(+user2.amount)+(+deposit)},{new:true})
                res.status(200).json({
                    data1:newdata,
                    data2:newdata2,
                    success:true
                })
            }else{
                res.status(400).json({
                    msg:"enter valid password"
                })
            }
        }
    }catch(err){
        res.status(400).json({msg:"error while sending money"})
    }
}
module.exports={AddMoney,SendMoney}