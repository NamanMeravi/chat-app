 import React from 'react'
 import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
 const App = () => {
   return (
     <div>

     <Routes>
       
       <Route  element={<Login/>} path='/'/>
       <Route  element={<Signup/>} path='/signup'/>
       <Route element={<Home/>} path='/home'/>
     </Routes>
     </div>
     
   )
 }
 
 export default App
 