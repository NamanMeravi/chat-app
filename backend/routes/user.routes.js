import express from 'express'
import {  getalluser, Login, Registration, searchuser } from '../controllers/User.controller.js';
import { protect } from '../middlewares/authmiddleware.js';

const router = express.Router();


router.post('/signup',Registration);

router.post('/login',Login)




 router.get('/search',protect,searchuser) /* search user */

 router.get('/get',protect,getalluser) /* all users whome we talked */


export default router