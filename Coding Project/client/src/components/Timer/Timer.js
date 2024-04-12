import { useState, useEffect } from "react";
import { PiBrain } from "react-icons/pi";
import { FaCoffee } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const Timer = () => {

  require('./Timer.css');

  // variables for timers
  const WORKTIME = 25;
  const SHORTBREAK = 5;
  const LONGBREAK = 15; 
  
  const [minutes, setMinutes] = useState(WORKTIME);
  const [seconds, setSeconds] = useState(0);
  const [tasks, setTasks] = useState(1);
  const [running, setRunning] = useState(null);
  const [action, setAction] = useState(WORKTIME);

  useEffect(() => {
    let interval = null;
    if (running) {
      // setInterval - a function to be executed in every delay seconds (here every one second)
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        }
        else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        }  
      }, 1000);
    }

    if (seconds === 0 && minutes === 0) {
      if (action == WORKTIME) {
        if (tasks < 3) {
          setMinutes(SHORTBREAK)
          setAction(SHORTBREAK)
        }
        else if (tasks === 3) {
          setMinutes(LONGBREAK)
          setAction(LONGBREAK)
        }
      }
      else if (action == SHORTBREAK) {
        setMinutes(WORKTIME)
        setAction(WORKTIME)
        setTasks(tasks+1)
      }
      else if (action == LONGBREAK) {
        setMinutes(WORKTIME)
        setAction(WORKTIME)
        setTasks(1)
      }
      setRunning(false)
    }
    // clear interval invokes a rerender
    return () => clearInterval(interval);
  }, [seconds, minutes, running, action]);     // runs for every change in seconds or minutes

  function startTimer() {
    setRunning(true);
  }

  function pauseTimer() {
    setRunning(false);
  }

  function renderHeader () {

    if (action == WORKTIME) {
      return <h1 style={{fontSize:"3rem", marginLeft:"3rem"}}>focus</h1>
    }
    else if (action == SHORTBREAK) {
      return <p>short break!</p>
    }
    else if (action == LONGBREAK) {
      return <p>long break!</p>
    }
  }

  return (
    
    <div className = "main-timer">
      <div className="timer-action">
        <h3>{action == WORKTIME ? "focus" : "break"}</h3>
      </div>

      <div className="timer-times">
        <h1 style={{marginTop:"-3rem"}}>{minutes < 10 ? "0" + minutes : minutes}</h1>
        <h1 style={{marginTop:"-6rem"}}>{seconds < 10 ? "0" + seconds : seconds}</h1>
      </div>

      <div>
        {!running && (
          <button className="timer-button" onClick={startTimer}><FaPlay className="timer-icons"/></button>
        )}
        {running && (
          <button className="timer-button" onClick={pauseTimer}><FaPause className="timer-icons"/></button>
        )}
      </div>

    </div>
  );
};

export default Timer;