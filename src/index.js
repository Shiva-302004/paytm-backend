const express=require('express')
const dotenv=require('dotenv')
const clc=require("cli-color")
const cors=require("cors")
const db=require("../database/dbconn")
const route=require("../routes/authroute")
const router = require('../routes/transactions')
const app=express()
const PORT=process.env.PORT||8000
dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/api/auth/user",route)
app.use("/api/auth/transaction",router)
db().then(()=>{
    app.listen(PORT,()=>{
        console.log(clc.red.white("server connected successfully"))
    })
}).catch((err)=>{
    console.log(clc.red.white(err))
})