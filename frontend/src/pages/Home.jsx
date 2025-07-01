import React, { useEffect } from 'react'
import { useAuth } from '../store/store.jsx'
const Home = () => {
  const {user} = useAuth()

  


  return (
    <div>
     
      <p>Welcome {user.username}</p>
    </div>
  )

  

}

export default Home
