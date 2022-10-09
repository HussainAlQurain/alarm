const b = document.body;

b.style.backgroundColor = "black";
b.style.display = "flex";
b.style.alignItems = "center";
b.style.justifyContent = "center";


const clockDiv = document.getElementById('clock');

clockDiv.style.backgroundColor = '#0e296e';
clockDiv.style.color = 'white';
clockDiv.style.position = "relative";
clockDiv.style.top = "50%";
clockDiv.style.textAlign = "center";
clockDiv.style.fontSize = "3em";
clockDiv.style.fontFamily = "Orbitron";

var audio = new Audio('alarm.mp3');
audio.loop = true;

var alarm_time = "25:29:10 PM";

function updateTime(){
    var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var amPm = '';
    
    if (hour >= 12){
        amPm = 'PM';
        if (hour > 12){
            hour -= 12;
        }
    }
    else{
        amPm = 'AM';
    }
    if(hour < 10){
        hour = "0" + hour;
    }
    if(min < 10){
        min = "0" + min;
    }
    if(sec < 10){
        sec = "0" + sec;
    }
    var time = hour + ":" + min + ":" + sec + " " + amPm;
    if (time === '02:29:10 PM'){
        audio.play();
    }
    clockDiv.innerHTML = time;
}

var test = window.setInterval(function(){updateTime()}, 1000);