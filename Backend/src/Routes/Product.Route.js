const express = require("express")
const {Product} =require("../Model/ProductSchema")
const route = express.Router()
const validator = require("validator")
route.post("/product-create" ,async (req,res)=>{
    try {
          const {name ,price,desc,quantity,image,category}=req.body
          if(!name){
            throw new Error("Product name is required")
          }
          if(!price){
            throw new Error("Product price is required")
          }
          if(!desc){
            throw new Error("Product description is required")
          }
          if(!quantity){
            throw new Error("Product quantity is required")
          }
          if(!validator.isURL(image)){
            throw new Error("Please provide a valid image URL")
          }
         if (!category) {
             throw new Error("Product category is required")
          }
          
          const createProduct = await Product.create({name , price , desc , quantity ,image,category})
          res.status(201).json({success:true , data : createProduct})
    }
     catch (error) {
        res.status(400).json({ success : false , error:error.message})
        
    }
}) 


route.get("/product/:id", async (req,res)=>{
    try {
         const {id} = req.params
    const findProductById = await Product.findById(id)
    if(!findProductById){
        throw new Error("Product not Exist")
    }
    res.status(200).json({success:true, data : findProductById})
    } catch (error) {
        res.status(400).json({success:false , error:error.message})
    }
   
})

route.delete("/product/:id", async (req,res)=>{

    try {
            const {id} = req.params 
            const productDeleteById = await Product.findByIdAndDelete(id)
            if(!productDeleteById){
                throw new Error("Something was Wrong")
            }
             res.status(200).json({success:true , data : productDeleteById})
    } catch (error) {
        res.status(400).json({success:false ,error:error.message})
        
    }
})
route.delete("/product/:id", async (req,res)=>{

    try {
            const {id} = req.params 
            const productDeleteById = await Product.findByIdAndDelete(id)
            if(!productDeleteById){
                throw new Error("Something was Wrong")
            }
             res.status(200).json({success:true , data : productDeleteById})
    } catch (error) {
        res.status(400).json({success:false ,error:error.message})
        
    }
})
route.delete("/product/:id", async (req,res)=>{

    try {
            const {id} = req.params 
            const productDeleteById = await Product.findByIdAndDelete(id)
            if(!productDeleteById){
                throw new Error("Something was Wrong")
            }
             res.status(200).json({success:true , data : productDeleteById})
    } catch (error) {
        res.status(400).json({success:false ,error:error.message})
        
    }
})
route.delete("/product/:id", async (req,res)=>{

    try {
            const {id} = req.params 
            const productDeleteById = await Product.findByIdAndDelete(id)
            if(!productDeleteById){
                throw new Error("Something was Wrong")
            }
             res.status(200).json({success:true , data : productDeleteById})
    } catch (error) {
        res.status(400).json({success:false ,error:error.message})
        
    }
})
route.delete("/product/:id", async (req,res)=>{

    try {
            const {id} = req.params 
            const productDeleteById = await Product.findByIdAndDelete(id)
            if(!productDeleteById){
                throw new Error("Something was Wrong")
            }
             res.status(200).json({success:true , data : productDeleteById})
    } catch (error) {
        res.status(400).json({success:false ,error:error.message})
        
    }
})
module.exports={ProductRoute : route}