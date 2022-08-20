import { createContext,useState,useContext,useEffect } from 'react'
import {  signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';

const userAuthContext=createContext();

export function UserAuthContextProvider({children}) {
     const [user,setUser]=useState({});
    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }
    function signIn(email,password){
      return signInWithEmailAndPassword(auth,email,password)
    }
    function logout(){
         return signOut(auth)
    }
    useEffect(()=>{
     onAuthStateChanged(auth,(currentUser)=>{
             setUser(currentUser)
       })
       
    },[])
       return <userAuthContext.Provider value={{user,signUp,signIn,logout}}>{children}</userAuthContext.Provider>
}


export function useUserAuth(){
     return useContext(userAuthContext)
}
