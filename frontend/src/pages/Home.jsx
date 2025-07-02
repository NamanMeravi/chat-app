import React, { useEffect } from 'react'
import { useAuth } from '../store/store.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import MessageArea from '../../components/MessageArea.jsx'


const Home = () => {
  const {user} = useAuth()

  return (
    <div className='main-container' >
        <Sidebar/>
       <MessageArea/>
    </div>
  )

  

}

export default Home
