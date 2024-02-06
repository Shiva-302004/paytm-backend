const bcryptjs=require("bcryptjs")

const hashedpassword=async(val)=>{
    try{
        const hashedpassword=await bcryptjs.hash(val,10)
        return hashedpassword
    }catch(err){
        console.log("error while hashing")
    }
}
const comparepassword=async(val,pass)=>{
    try{
        const isCompare=await bcryptjs.compare(val,pass)
        return isCompare
    }catch(err){
        console.log(err)
    }
}
module.exports={hashedpassword,comparepassword}