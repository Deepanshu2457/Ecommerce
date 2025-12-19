const mongoose = require("mongoose")
const validator = require("validator")
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price :{
        type : String,
        required : true,

    },
    desc : {
        type : String,
        required : true ,
        minlength : 5,
        maxlength : 50

    },
    quantity : {
        type : Number,
        required : true ,

    },
    image : {
        type : String,
        required : true ,

        validate : (val)=>{
            const isUrl = validator.isUrl(val)
            if(!isUrl){
                throw new error("invalid Email")
            }
        }
    },
    category : {
        type : String,
        enum : [ "electronics" , "grocery","clothes"],
        required : true
    }

})

const Product = mongoose.model("product", productSchema)

module.exports={Product}