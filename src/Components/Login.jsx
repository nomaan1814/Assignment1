import {  signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../firebase";
import {Link,useNavigate} from "react-router-dom"
import { useUserAuth } from "../context/userContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg,setErrMsg]=useState("");
    const [submitButtonDisabled,setsubmitButtonDisabled]=useState(false)
    const {signIn}=useUserAuth()
    const navigate=useNavigate()
    const submitHandler=async()=>{
       if(!email || !password){
              setErrMsg("Fill all fields");
              return;
       }
       setErrMsg("");
       setsubmitButtonDisabled(true)
       try {
           await signIn(email,password);
           navigate("/home")
           setsubmitButtonDisabled(false)
       } catch (error) {
        setErrMsg(error.message)
        setsubmitButtonDisabled(false)
       }
       
    }
    return (
      <div>
        <section class="text-gray-600 body-font relative">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-6">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Login
              </h1>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2 form">
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="name"
                      name="email"
                      class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="password" class="leading-7 text-sm text-gray-600">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div class="text-center error">
                    <p>{errorMsg}</p>
                </div>
                <div class="p-2 w-full">
                  <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={submitHandler} disabled={submitButtonDisabled}>
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div class="text-grey-dark mt-6">
              Not have an account?
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </section>
      </div>
    )
}

export default Login
