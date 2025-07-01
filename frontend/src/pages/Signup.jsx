import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/store';
const Signup = () => {

  
 const navigate = useNavigate()
 const {storetokenInLS} = useAuth()
  const [user,setuser] = useState({
    username:"",
    email:"",
    password:""
  })
  
    const handleChange = async(e)=>{
         let name = e.target.name;
         let value = e.target.value;
         console.log(value);
         
  
         setuser({
          ...user,
          [name]:value
         })
  
    }
 

  const handleSubmit = async(e) => {
    e.preventDefault();
  try {
    const responce = await fetch("http://localhost:3000/api/user/signup",{
     method:"POST",
       headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(user)
    })

      const data = await responce.json()
    //console.log(data);

    if(responce.ok){
      setuser({
        username:"",
        email:"",
        password:""
      })

      storetokenInLS(data.token)
      alert("signup successfully")
      navigate('/home')
    }
    else{
      alert("not signup successfully")
    }
  } catch (error) {
    console.log(error,"sigup unsuccessfull");
    
  }
    

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111b21]">
      <div className="w-full max-w-md p-8 bg-[#202c33] rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#e9edef] mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
             <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[#8696a0]">Username</label>
            <input
              type="username"
              name="username"
              
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-[#2a3942] text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-transparent"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[#8696a0]">Email Address</label>
            <input
              type="email"
              
              name='email'
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-[#2a3942] text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-transparent"
              placeholder=" Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-[#8696a0]">Password</label>
            <input
              type="password"
              name='password'
              
              value={user.password}
               onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-[#2a3942] text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-transparent"
              placeholder="Password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-[#111b21] bg-[#00a884] rounded-lg hover:bg-[#02916b] focus:outline-none focus:ring-2 focus:ring-[#02c097] focus:ring-offset-2 cursor-pointer">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-[#8696a0]">
          Already have an account?{' '}
          <Link to="/" className="text-[#00a884] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup