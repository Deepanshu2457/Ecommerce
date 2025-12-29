const express=require("express")
const {isBuyer}= require("../MIddleware/IsBuyer")
const {isloggedIn} = require("../MIddleware/IsloggedIn")
const {Product} =require("../Model/ProductSchema")
const route = express.Router()

route.patch("/addproduct", isBuyer ,isloggedIn,  async (req,res)=>{

    try {
         const {id , q} = req.query
         const foundProduct = await Product.findById(id)
         if(!foundProduct){
            throw new Error(" please select product")
         }
        
         const prevCart = req.user.cart
          let isProduct = false

          for(let item of product){
            if(item.product._id.toString() == id.toString()){
                isProduct = true 
                item.quentity = q 
                break
            }
          }

          if(!isProduct){
            req.user.cart.push(...prevCart , { product : foundProduct , quentity : q})
            const cart = await req.user.save()
          }
          res.status(200).json({success : true , data : prevCart})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports={buyerRouter : route}