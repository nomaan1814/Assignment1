import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Components/Login';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import {UserAuthContextProvider} from './context/userContext'
import Home from './Components/Home';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

function App() {
  const [loginUser,setloginUser]=useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
        if(user){
          setloginUser(user)
        }
    })
  },[])
  return (
    <div className="App">
       <BrowserRouter>
       <UserAuthContextProvider>
          <Routes>
             <Route path ="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
             <Route path ="/signup" element={<Signup />}/>
             <Route path="/" element={<Login />} />
          </Routes>
          </UserAuthContextProvider>
       </BrowserRouter>
    </div>
  );
}

export default App;
