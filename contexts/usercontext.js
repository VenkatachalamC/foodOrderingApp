import { createContext,useState } from "react";

export const userContext=createContext({
    username:"",
    login:(name)=>{},
    logout:()=>{}
})

const UserContext=({children})=>{
    const [user,setuser]=useState("")
    function login(name){
        setuser(name);
    }
    function logout(){
        setuser("")
    }
    return (
        <userContext.Provider value={{username:user,login:login,logout:logout}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContext;