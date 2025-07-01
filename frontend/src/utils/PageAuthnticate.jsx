import React, { useEffect } from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import { useAuth } from '../store/store.jsx'
const PageAuthnticate = () => {
   
 const {isLoggedIn,isLoading}=useAuth()
    
  return isLoggedIn?<Outlet/>:<Navigate to={'/'}/>
  
  
}

export default PageAuthnticate
