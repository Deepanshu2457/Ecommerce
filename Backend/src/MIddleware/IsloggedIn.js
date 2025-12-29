const jwt = require("jsonwebtoken")
const {User}= require("../Model/UserSchema")

const isloggedIn = async (req,res,next)=>{

    try {
        const {loginToken} = req.cokkie
        const originalObject = jwt.verify(loginToken, process.env.JWT_SECRET)
        const foundUser= await User.findOne({_id : originalObject.id})

        if(!foundUser){
            throw new Error("Please Login first")
        }
        res.user=foundUser
        next()
    } catch (error) {
        res.status(400).json({error :  error.message})
    }


}

module.exports= {isloggedIn}