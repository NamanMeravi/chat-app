import mongoose from "mongoose";


export const dbconnect = async()=>{
try {
    const connect = await mongoose.connect(process.env.DB_CONNECT)

    if(connect){
        console.log(`database connected with host ${connect.connection.host}`);
        
    }
} catch (error) {
    console.log("not able to connect to database",error);
    
}
}

