 import React from 'react'
 import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import PageAuthnticate from './utils/PageAuthnticate.jsx'

 const App = () => {
   return (
     <div>

     <Routes>
       
       <Route  element={<Login/>} path='/'/>
       <Route  element={<Signup/>} path='/signup'/>
      


       <Route element={<PageAuthnticate/>}>

       <Route element={<Home/>} path='/home'/>

       </Route>

      
     </Routes>
     </div>
     
   )
 }
 
 export default App
 