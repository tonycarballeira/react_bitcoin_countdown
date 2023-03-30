import React from 'react'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import {BsFillFileArrowDownFill} from 'react-icons/bs'


const Timer = () => {

    const [secondsLeft, setSecondsLeft] = useState(0);
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

    const updateCount = () => {
        timer = setInterval(() => {
            console.log(secondsLeft);
            setSecondsLeft((t) => t - 1);
            setDays(Math.floor(secondsLeft / 3600 / 24));
            setHours(Math.floor(secondsLeft / 3600) % 24);
            setMinutes(Math.floor(secondsLeft / 60) % 24);
            setSeconds(Math.floor(secondsLeft) % 60); 
        }, 1000)
    }

    useEffect(() => {
        updateCount()     
        return () => clearInterval(timer)
    }, [secondsLeft])

    const formatTime = (time) => {
        
        if (time < 10 && time > 0) {
            return "" + 0 + time;
        }   else if (time < 0) {
            return "";
        } else {
            return time;
        }
                
    }

  return (
    <div className="w-full h-screen" style={{backgroundImage: "url('https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg')"}}>
        <div className="w-full h-screen bg-black bg-opacity-70">
            <div className="w-full h-full flex flex-col items-start justify-between container mx-auto py-8 px-8 lg:px-4 xl:px-0">
                <div className="flex-1 flex flex-col items-start justify-center">
                    <h1 className="text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold mt-12 text-center md:text-left">Bitcoin <span className="text-yellow-300">Halving</span> Countdown</h1>
                    
                    <div className="mt-12 flex flex-col items-center mt-8 ml-2">
                        <p className="text-gray-300 uppercase text-sm">Time left until the halving</p>
                        <div className="flex items-center justify-center space-x-4 mt-4" x-data="timer(new Date().setDate(new Date().getDate() + 1))" x-init="init();">
                            <div className="flex flex-col items-center px-4">
                                <span x-text="time().days" className="text-4xl lg:text-5xl text-gray-200">{formatTime(days)}</span>
                                <span className="text-gray-400 mt-2">Days</span>
                            </div>
                            <span className="w-[1px] h-24 bg-gray-400"></span>
                            <div className="flex flex-col items-center px-4">
                                <span x-text="time().hours" className="text-4xl lg:text-5xl text-gray-200">{formatTime(hours)}</span>
                                <span className="text-gray-400 mt-2">Hours</span>
                            </div>
                            <span className="w-[1px] h-24 bg-gray-400"></span>
                            <div className="flex flex-col items-center px-4">
                                <span x-text="time().minutes" className="text-4xl lg:text-5xl text-gray-200">{formatTime(minutes)}</span>
                                <span className="text-gray-400 mt-2">Minutes</span>
                            </div>
                            <span className="w-[1px] h-24 bg-gray-400"></span>
                            <div className="flex flex-col items-center px-4">
                                <span x-text="time().seconds" className="text-4xl lg:text-5xl text-gray-200">{formatTime(seconds)}</span>
                                <span className="text-gray-400 mt-2">Seconds</span>
                            </div>
                            <span className="w-[1px] h-24 bg-gray-400"></span>
                            <div className="flex flex-col items-center px-4">
                                <span x-text="time().seconds" className="text-4xl lg:text-5xl text-gray-200"><a href="#search"><BsFillFileArrowDownFill/></a></span>
                                <span className="text-gray-400 mt-2">Coin Search</span>
                            </div>
                        </div>                      
                    </div>
                        {/* <div className="flex flex-col items-center space-y-4 mt-16 px-6">
                            <p className="text-gray-300 uppercase text-sm">Notify me when it's here</p>
                            <form className="w-full flex items-center">
                                <input type="email" name="email" id="email" className="w-72 p-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-tl rounded-bl text-sm" placeholder="Email" autocomplete="off" />
                                <button className="bg-blue-600 py-2 px-6 text-gray-100 border border-blue-600 rounded-tr rounded-br text-sm">Subscribe</button>
                            </form> 
                        </div> */}
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Timer
