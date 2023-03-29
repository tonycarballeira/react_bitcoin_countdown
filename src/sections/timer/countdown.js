
const request = new XMLHttpRequest();
request.open("GET","https://blockchain.info/stats?format=json");
request.send();

const showDays = document.getElementById('showDays');
const showHours = document.getElementById('showHours');
const showMinutes = document.getElementById('showMinutes');
const showSeconds = document.getElementById('showSeconds');

let jsonObject = {};

let secondsLeft = 0;

//When receiving data from a web server, the data is always a string.
//Parse the data with JSON.parse(), and the data becomes a JavaScript object.
// next bitcoin halving occurs at the block height of 840,000. 
//subtract current total blocks to get blocks left until halving.

request.onload = function(){
    jsonObject = JSON.parse(request.response);
    const blocksLeft = 840000 - jsonObject.n_blocks_total;
    const minsBetween = jsonObject.minutes_between_blocks;
    const minsLeft = blocksLeft * 9.267;
    secondsLeft = minsLeft * 60;
    console.log(jsonObject.minutes_between_blocks);
}

function setTime(){
    secondsLeft = secondsLeft - 1;
    console.log(secondsLeft);
    
    const days = Math.floor(secondsLeft / 3600 / 24);
    const hours = Math.floor(secondsLeft / 3600) % 24;
    const minutes = Math.floor(secondsLeft / 60) % 24;
    const seconds = Math.floor(secondsLeft) % 60;
    
    showDays.innerHTML = formatTime(days);
    showHours.innerHTML = formatTime(hours);
    showMinutes.innerHTML = formatTime(minutes);
    showSeconds.innerHTML = formatTime(seconds);

    console.log(showDays);
}
setTime();

setInterval(setTime, 1000);

function formatTime(time) {
    if (time < 10 && time > 0) {
        return "" + 0 + time;
    }   else if (time < 0) {
        return "";
    } else {
        return time;
    }
        
}