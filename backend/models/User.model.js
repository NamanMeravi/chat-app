import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://e7.pngegg.com/pngimages/998/466/png-clipart-computer-icons-people-logo-logo-black-thumbnail.png"
    }
},{
    timestamps:true
})


UserSchema.pre("save", async function (next){
    const user = this;
    if(!user.isModified('password')){
        next();
    }

  try {
        const salt =  bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(user.password,salt);
        user.password = hashpassword;
    } catch (error) {
        console.log(error);
        next(error)
        
    }

    
})






export const User = mongoose.model("User",UserSchema);

