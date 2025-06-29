import jwt from 'jsonwebtoken'
import { User } from '../models/User.model.js';



export const protect = async(req,res,next)=>{

const token = req.header("Authorization");

   if(!token){
    return res.status(400).json({message:"Unauthorized HTTP, Token not provided"})
   }

      const jwtToken = token.replace('Bearer',"").trim() 

      try {
         const isVerified = jwt.verify(jwtToken,process.env.JWT)
         const userdata = await User.findOne({email:isVerified.email})

         req.userid = userdata._id
         req.user = userdata
         req.token = token
         
         
         next()
         
      } catch (error) {
            return res.status(401).json({message:"Unauthorized HTTP, Token not provided",error})
      }

}