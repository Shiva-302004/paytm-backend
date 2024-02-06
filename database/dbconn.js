const mongoose=require('mongoose')
const dotenv=require('dotenv')
const clc=require("cli-color")
dotenv.config()
const URI=process.env.URI

const db=async()=>{
    try{
        await mongoose.connect(URI)
        console.log("server connectred")
    }catch(err){
        console.log(clc.bgRed.white(err))
    }
}
module.exports=db