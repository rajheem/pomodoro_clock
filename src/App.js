import './App.css';
import React, {useEffect, useRef, useState} from "react";
import sound1 from "./sounds/beep.mp3"
import {clear} from "@testing-library/user-event/dist/clear";
import {isDisabled} from "@testing-library/user-event/dist/utils";
import {CountdownCircleTimer} from "react-countdown-circle-timer"
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

function App() {
    const[breaklength,setBreakLength]=useState(5)
    const[sessionlength,setSessionLength]=useState(25)
    const[istimeon,setIsTimeOn]=useState(false)
    const[timeleft,setTimeLeft]=useState(sessionlength*60)
    const[issession,setIsSession]=useState("Session")
    const [running,setRunning]=useState(false)
    const audio=document.getElementById("beep")


    function upBreak() {
        if(breaklength<60){
            setRunning(false)
            setBreakLength(breaklength+1)
            if(issession=="Break"){
                setTimeLeft(timeleft+60)
            }

        }
    }

    function downBreak() {
        if(breaklength>1){
            setRunning(false)
            setBreakLength(breaklength-1)
            if(issession=="Break"){
                setTimeLeft(timeleft-60)
            }

        }
    }

    function upSession() {
        if(sessionlength<60){
            setRunning(false)
            setSessionLength(sessionlength+1)
            if(issession=="Session"){
                setTimeLeft(timeleft+60)
            }
        }
    }

    function downSession() {
        if(sessionlength>1){
            setRunning(false)
            setSessionLength(sessionlength-1)
            if(issession=="Session"){
                setTimeLeft(timeleft-60)
            }

        }
    }

    function time(){
        const minutes=Math.floor(timeleft/60)
        const seconds=timeleft-minutes*60
        const formatMinutes=minutes<10? "0"+minutes:minutes
        const formatSeconds=seconds<10? "0"+seconds:seconds
        return `${formatMinutes}:${formatSeconds}`;
    }

    function handlePlay(){
        setRunning(false)
        clearTimeout(Countdown)
        if(istimeon){
            setIsTimeOn(false)
        }else{
            setIsTimeOn(true)
        }
    }

    function handleReset(){
        setRunning(true)
        clearTimeout(Countdown)
        setIsTimeOn(false)
        audio.pause()
        audio.currentTime=0

    }

    function reset(){
        setTimeLeft(sessionlength*60)
        setSessionLength(25)
        setBreakLength(5)
        setIsSession("Session")
        console.log(timeleft)
    }


    function Countdown(){
        setTimeout(()=>{
            if(timeleft!==0 && istimeon!==false){
                setTimeLeft(timeleft-1)
            }
        },1000);
    }

    function clock(){
        if(istimeon){
            Countdown()
            sessionOrBreak()
        }else{
            clearTimeout(Countdown)
        }
    }

    function sessionOrBreak(){
        if(!timeleft && issession==="Session"){
            setTimeLeft(breaklength*60)
            setIsSession("Break")
            audio.play()
        }
        if(!timeleft && issession=="Break"){
            setTimeLeft(sessionlength*60)
            setIsSession("Session")
        }
    }
useEffect(
    ()=>{
        if(!running){
            clock()
        }
        else if(running){
            reset()
        }
    },[istimeon,timeleft,Countdown,handleReset]
)
const percentage=60

    return (
    <div className="App container">
        <div id="display" className="row row-cols-2">
        <div className="break col card">
            <div className="card-header">
                <div id="break-label">Break Length</div>
                <div id="break-length">{breaklength}</div>
            </div>
            <div className="card-body">
                <button type="button" id="break-increment" className="btn btn-success"onClick={upBreak} disabled={istimeon}>+</button>
                <button type="button" id="break-decrement" className="btn btn-success"onClick={downBreak} disabled={istimeon}>-</button>
            </div>
        </div>



        <div className="session col card">
            <div className="card-header">
                <div id="session-label">Session Length</div>
                <div id="session-length">{sessionlength}</div>
            </div>
            <div className="card-body">
                <button type="button" id="session-increment" className="btn btn-success"onClick={upSession} disabled={istimeon}>+</button>
                <button type="button" id="session-decrement" className="btn btn-success"onClick={downSession} disabled={istimeon}>-</button>
            </div>
        </div>


        <div className="timer col-8 card">
            <div className="card-header">
                <div id="timer-label">{issession}</div>
                <CircularProgressbar
                    value={timeleft}
                    text={`${time()}`}
                    styles={buildStyles({

                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',

                        // Text size
                        textSize: '16px',

                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,

                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',

                        // Colors
                        pathColor: `rgba(62, 152, 199, ${timeleftg / 100})`,
                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}
                />

            </div>
            <div className="card-body">
                <button id="start_stop" className="btn btn-success" onClick={handlePlay}>Start/Stop</button>
                <button id="reset" className="btn btn-success" onClick={handleReset}>Reset</button>
                <audio id="beep" src={sound1} type="audio/mp3"/>
            </div>
        </div>

        </div>
    </div>
  );
}

export default App;
