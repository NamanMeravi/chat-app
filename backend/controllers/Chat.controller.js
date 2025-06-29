import { Conversation } from "../models/Conversation.model.js";
import { Mesasge } from "../models/Message.model.js";

//send message
export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;

        const reciverId = req.params.id;

        const senderId = req.userid;

        let chats = await Conversation.findOne({
            participants:{
                $all:[
                    senderId,reciverId
                ]
            }
        })

        if(!chats){
             chats = await Conversation.create({
                participants:[senderId,reciverId]
             })
        }

        const newMessages = new Mesasge({
            senderId,
            reciverId,
            message,
            conversationId:chats._id

        })

        if(newMessages){
            chats.messages.push(newMessages._id)
        }

        await Promise.all([chats.save(),newMessages.save()])

        return res.status(201).json({
            message:"message send",
            newMessages
        })
    } catch (error) {
        console.log(error,'send nahi huaa'); 
        
    }
}


/* get single user messages */



export const getmessages = async(req,res)=>{
      
      try {
        const reciverId = req.params.id;
       const senderId = req.userid;

       const chats = await Conversation.findOne({
          participants:{
            $all:[senderId,reciverId]
          }
       }).populate("messages")


       if(!chats){
       return res.status(200).json({
        message:"No conversation started",
        
       })
       }

       const message = chats.messages;

       return res.status(200).json({
        message
       })





      } catch (error) {
         console.log(error,'getmessage nahi ho paa raha'); 
      }


}