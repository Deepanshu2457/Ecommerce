const express = require("express")
const {User} = require("../Model/UserSchema")
const route = express.Router()
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




route.post("/signup" , async  (req,res)=>{

    try {
         const {firstName, lastName, userName , profilepicture , password,mobileNo,role } = req.body
    if(!firstName || firstName.length < 2 || firstName.length > 25){
        throw new Error("Firstname should be min 2 charcter & max 25 charcter ")
    }
     if(!lastName || lastName.length < 2 || lastName.length > 25){
        throw new Error("Please Enter Your lastname ")
    }
      if(!userName || userName.length < 2 || userName.length > 25){
        throw new Error("Please Enters Your naam")
    }
    //    if(!profilepicture || !validator.isUrl(profilepicture)){
    //     throw new Error(" please Enter valid image ")
    // }
//     if ( !profilepicture ||!validator.isURL(profilepicture, {
//     protocols: ['http', 'https'],
//     require_protocol: true
//   })
// ) {
//   throw new Error("Please enter a valid image URL");
// }
    if (!mobileNo ||!validator.isMobilePhone(mobileNo.toString(), "en-IN"))
         {
  throw new Error("Please enter a valid mobile number");
}

      if(!role || !["saler","buyer"] .includes(role))
        {
            throw new Error(" you can create either buyer or seller account ")
        }

    const isPasswordStrong = validator.isStrongPassword(password)
    if(!isPasswordStrong){
        throw new Error("Please Enter a strong Password")
    }

     const isPersentUserName = await User.findOne({userName : userName.toLowerCase()})

     if(isPersentUserName){
        throw new Error(" user already Exist")
     }
    const hashPassword = await bcrypt.hash(password ,10)
    const createdUser = await User.create({firstName,lastName,userName : userName.toLowerCase(), profilepicture : profilepicture,role,mobileNo,password : hashPassword})
    res.status(201).json({message : "done" , data : createdUser})

        
    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
})

route.post("/signin" , async (req,res)=>{
    try {
        const {userName , password} = req.body
        if(!userName){
           throw new Error("please enter a valid username")
        }
        if(!password){
            throw new Error("please enter your password")
        }
        const founduser = await User.findOne({userName : userName.toLowerCase()})

        if(!founduser){
            throw new Error("user does not exist")
        }

        const flag = await bcrypt.compare(password,founduser.password)
        if(!flag){
            throw new Error("password Incorrect")
        }
 
         const token = jwt.sign({id : founduser._id}, process.env.JWT_SECRET)
         const {firstName,lastName, userName :un , profilepicture,mobile,role}=  founduser
         res.cookie("loginToken", token, {maxAge : 24*60*60*1000}).status(200)
         .json({success : true , message : "login ",userData : firstName,lastName,userName:un , profilepicture,mobile ,role})

         
    } catch (error) {
        res.status(400).json({error : error.message})
        
    }

  
})
  route.post("/signout",(req,res)=>{
        res.cookie("loginToken",null).status(200).json({sucess : true , message : "logout"})
    })
module.exports = {userRoute : route}