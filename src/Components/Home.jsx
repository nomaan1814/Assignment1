import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userContext";

const Home = () => {
  let { user, logout } = useUserAuth();
  const [w_minute, setWmin] = useState(25);
  const [w_sec, setWsec] = useState(0);
  const [active, setActive] = useState(false);
  const [pause,setPause]=useState(false);
  const [reset,setReset]=useState(false)
 
  useEffect(() => {
    if (active && !pause) {
      let interval = setInterval(() => {
        if(reset){
          if(displayMessage){
            setWmin(5)
          }
          else{
          setWmin(25);
          }
        }
        clearInterval(interval);
        if (w_sec == 0) {
          if (w_minute != 0) {
            setWsec(59);
            setWmin(w_minute - 1);
          } else {
            let minute = displayMessage ? 24 : 4;
            let seconds = 59;
            setWsec(seconds);
            setWmin(minute);
            setDisplayMessage(!displayMessage);
          }
        } else {
          if(reset){
            setWsec(0)
            setReset(false)
          }
          else{
          setWsec(w_sec - 1);
          }
        }
      }, 1000);
    }
  }, [w_sec,active,pause,reset]);
  const resetwatch=()=>{
    setReset(true);
  }
  const timerMinute = w_minute < 10 ? `0${w_minute}` : w_minute;
  const timerSec = w_sec < 10 ? `0${w_sec}` : w_sec;
  const [displayMessage, setDisplayMessage] = useState(false);
  const navigate = useNavigate();
  
  const makepause=()=>{
      setPause(true);
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {}
  };
  return (
    <div className="container-fluid bg-[#0f172a] text-white mx-auto min-h-max compelete">
      <div className="top">
        <h1 className="text">Welcome {user.email} to Pomodoro</h1>

        <div class="p-2 w-full ml-5 btn">
          <button
            class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="watch">
        {displayMessage && <p>Break Time Starts</p>}
        <div id="work-timer" className="timer">
          <p id="w_minutes">
            {timerMinute}:{timerSec}
          </p>
        </div>
      </div>
      <div className="btn">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {setActive(true);
          setPause(false)}}
        >
          Start
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={makepause}>
          Stop
        </button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={resetwatch}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Home;
