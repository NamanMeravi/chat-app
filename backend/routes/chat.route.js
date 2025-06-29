import express from 'express'
import { getmessages, sendMessage } from '../controllers/chat.controller.js';
import { protect } from '../middlewares/authmiddleware.js';



const chatroute = express.Router();


chatroute.post('/send/:id',protect,sendMessage)

chatroute.get('/:id',protect,getmessages)


export default chatroute