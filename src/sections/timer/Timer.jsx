import React from 'react'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios';


const Timer = () => {
    const initial_timer = 0;
    const interval = useRef();

    const [secondsLeft, setSecondsLeft] = useState(initial_timer);
    const [data, setData] = useState([]);

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    let timer

    const getData = async () => {
        const { data } = await axios.get("https://blockchain.info/stats?format=json");
        setData(JSON.stringify(data));
        let blocksLeft = 840000 - data.n_blocks_total;
        let minsBetween = data.minutes_between_blocks;
        let minsLeft = blocksLeft * 9.267;
        let seconds = minsLeft * 60;
        setSecondsLeft(seconds);
        
    };

    useEffect(() => {
        getData();
        
    },[]);

    

    useEffect(() => {
        function handleTimer() {
          interval.current = setInterval(() => {
            setSecondsLeft((count) => count - 1);
          }, 1000);
        }
        handleTimer();
      }, [secondsLeft]);

    // const updateCount = () => {
    //     timer = !timer && setInterval(() => {
    //         console.log(secondsLeft);
    //         setSecondsLeft(secondsLeft => secondsLeft - 1);       
    //     }, 1000)
    // }

    // useEffect(() => {
    //     updateCount()
        
    //     return () => clearInterval(timer)
    // }, [])

    // setDays(Math.floor(secondsLeft / 3600 / 24));
    // setHours(Math.floor(secondsLeft / 3600) % 24);
    // setMinutes(Math.floor(secondsLeft / 60) % 24);
    // setSeconds(Math.floor(secondsLeft) % 60); 

    // console.log(days);
    // console.log(hours);
    // console.log(minutes);
    // console.log(seconds);

  return (
    <div>

        <h1>Bitcoin Halving</h1>

        <div class="countdown-container">
            <div className="days-c"> 
                <p className="count-item" id="showDays"></p>
                <span>{days}</span>
            </div>
            <div class="hours-c"> 
                <p class="count-item" id="showHours"></p>
                <span>Hours</span>
            </div>
            <div class="minutes-c"> 
                <p class="count-item" id="showMinutes"></p>
                <span>Minutes</span>
            </div>
            <div class="seconds-c"> 
                <p class="count-item" id="showSeconds"></p>
                <span>{seconds}</span>
            </div>
                
        </div>
        
    </div>
  )
}

export default Timer
