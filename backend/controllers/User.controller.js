import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Conversation } from "../models/Conversation.model.js";
const generateToken = (user) => {
  try {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT, {
      expiresIn: "10d",
    });
  } catch (error) {
    console.log(error, "jwt error");
  }
};

/* registration
 */
export const Registration = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(500).json({
        message: "User already exist",
      });
    }

    const newuser = await User.create({
      username,
      email,
      password,
      image,
    });

    if (newuser) {
      return res.status(201).json({
        message: "registration successfully",
        token: generateToken(username),
        userid: newuser._id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/* login  */

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        message: " Invalid credentials",
      });
    }

    return res.status(201).json({
      message: "Login successfully",
      token: generateToken(user),
      userid: user._id,
    });
  } catch (error) {
    console.log(error);
  }
};

/*Search user */

export const searchuser = async(req,res)=>{
     
  try {
    const search = req.query.search;

    const currtuserId = req.userid;

    const user = await User.find({
      $and:[
                  {username:{$regex:'.*'+search+'.*',$options:'i'}},
                  {
                    _id:{$ne:currtuserId}
                  }
      ]
    }).select('-password')
res.status(200).json(
  user
)
      
  } catch (error) {
    console.log(error);
    
  }

}





/* get all users fro login user */

export const getalluser = async(req,res)=>{
 try {

   const currtuserId = req.userid;
   const currentChatters = await Conversation.find({
              participants:currtuserId
   }).sort({
    updatedAt:-1
   })

   if(!currentChatters){
    return res.status(200).json({
      message:"You are lonely"
    })
   }

 const participantIds = currentChatters
      .flatMap((conversation) =>
        conversation.participants.filter((id) => id.toString() !== currtuserId.toString())
      );

   const uniqueParticipantIds = [...new Set(participantIds)];

    const users = await User.find({
      _id: { $in: uniqueParticipantIds },
    }).select("-password");

   

   return res.status(200).json({
    users
   })
  
 } catch (error) {
  console.log(error);
 }
}

