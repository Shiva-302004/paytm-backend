const mongoose=require('mongoose')
const validator=require('validator')
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    upipin:{
        type:String,
        required:true,
        length:6
    }
})
const model=new mongoose.model('User',schema)
module.exports=model