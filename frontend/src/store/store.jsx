import { useContext,createContext,useState, useEffect } from "react";


export const AuthContext = createContext();




export const AuthProvider = ({children})=>{
    
 const[token,setToken] = useState(localStorage.getItem('token'))
 const[user,setuser] = useState('')
 const[isLoading,setisLoading]=useState(true)

  const authorization = `Bearer ${token}`;
       const storetokenInLS=(servertoken)=>{
             setToken(servertoken);
              return localStorage.setItem('token',servertoken);
    }
    
   let isLoggedIn = token;
    /*Authorization*/

     const userAuthentication = async()=>{
         setisLoading(true)
        try {
            const responce = await fetch(`http://localhost:3000/api/user/getlogin`,
                {
                    method:"GET",
                    headers:{
                        Authorization:authorization
                    }
                }

            )

            if(responce.ok){
                const data = await responce.json()
                setuser(data.loginuser);
                setisLoading(false)
                console.log(data.loginuser);
                
            }else{
                setisLoading(false)
            }
        } catch (error) {
            console.log('error in fetching userdata');
            
        }
     }

     useEffect(()=>{
   userAuthentication()
     },[])

    return <AuthContext.Provider value={{storetokenInLS,user,isLoggedIn,isLoading,token}}>
    {children}
    </AuthContext.Provider>
}





export const useAuth  =()=>{
   
    const authContextvalue = useContext(AuthContext)

  if(!authContextvalue){
   throw new Error("useAuth used outside of the provider")
  }
    return authContextvalue
}