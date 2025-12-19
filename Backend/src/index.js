require("dotenv").config()
const express = require("express")

const app= express()

const mongoose=require("mongoose")
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("db connected ");
    app.listen(process.env.PORT ,()=>{
        console.log("Server is running on PORT "  + process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err ,"db connection failed");
})


app.get("/",(req,res)=>{
    console.log("welcome to Ecommerce Project");
})

