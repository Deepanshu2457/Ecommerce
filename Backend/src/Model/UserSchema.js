
const mongoose = require("mongoose")
const validator = require("validator")
const UserSchema= new mongoose.Schema({
    firstName : {
        type : String,
        maxlength : 25,
        minlength : 2,
        required : true
    },
    lastName : {
        type : String,
        maxlength : 20,
        minlength : 2,
        required : true
    },
    userName : {
        type : String,
        maxlength : 20,
        minlength: 2,
        required : true ,
        immutable : true
    },
    password : {
        type : String,
        required : true

    },
    role :{
        type : String,
        enum : ["saler", "buyer"],
        required : true,
        immutable : true
    },
    profilePicture : {
        type : String,
        validate : (val)=>{
          const isUrl = validator.isUrl(val)
          if(!isurl){
            throw new error("select a valid Image")
          }
        }
    },
    mobileNo : {
        type : String,
        required : true,
      
        validate : (val)=>{
            const isMobile = validator.isMobilePhone(val , "en-IN")
            if(!isMobile){
                throw new error(" Enter a valid Phone Number")
            }
        },
        maxlength :10,
    },
    cart : []

})
const User = mongoose.model("user" , UserSchema)

module.exports={
    User
}

