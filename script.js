//global variables:

let alarmIsSet = false;

let audio = new Audio('alarm.mp3');
audio.loop = true;

//set Alarm time
let alarm_time = ":00";


//end of global
const b = document.body;


//Style the body
b.style.backgroundColor = "black";
b.style.display = "flex";
b.style.alignItems = "center";
b.style.justifyContent = "center";


const clockDiv = document.getElementById('clock');
//style the clock
clockDiv.style.backgroundColor = '#0e296e';
clockDiv.style.color = 'white';
clockDiv.style.position = "relative";
clockDiv.style.top = "50%";
clockDiv.style.textAlign = "center";
clockDiv.style.fontSize = "3em";
clockDiv.style.fontFamily = "Orbitron";



//display time
function updateTime(){
    var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var amPm = '';
    let newHour, newMin;
    if(hour <10){
        newHour = "0" + hour;
    }
    else{
        newHour = hour;
    }
    if(min < 10){
        newMin = "0" + min;
    }
    else{
        newMin = min;
    }
    
    //time now
    var compareTime = newHour + ":" + newMin + ":00";

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
    var time = hour + ":" + min + ":" + sec;

    if (compareTime === alarm_time){
        audio.play();
        snooze.style.display = 'block';
    }

    clockDiv.innerHTML = time + " " + amPm;
}
//update time in page
var test = window.setInterval(function(){updateTime()}, 1000);

//break line element
var br = document.createElement('br');
//create alarm form
const alarm = document.getElementById('alarm');
var form = document.createElement("form");
form.setAttribute('id', 'myForm');
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");

btn1.setAttribute('type', 'button');
btn1.setAttribute('class', 'btn btn-primary');
btn1.setAttribute('id', 'setAlarm');
btn1.innerHTML = "Set alarm";

btn2.setAttribute('type', 'button');
btn2.setAttribute('class', 'btn btn-danger');
btn2.setAttribute('id', 'cancelAlarm');
btn2.innerHTML = "Cancel alarm";


var choose_time = document.createElement('input');
choose_time.setAttribute('id', 'alarmtime');
choose_time.setAttribute('type', 'time');

//add input field
form.appendChild(choose_time);
form.appendChild(br.cloneNode());
//add buttons
form.appendChild(btn1);
form.appendChild(btn2);


alarm.appendChild(form);

//end of form

//set alarm function
btn1.addEventListener("click", (function(){
    
    return function(){
        alarm_time = choose_time.value + ":00";
        if(alarm_time ===":00"){
            alert("Please select time");
        }
        else if(alarm_time !==":00" && alarmIsSet === false){
            alarmIsSet = true;
            let span = document.createElement("span");
            span.innerHTML = `Alarm is set for ${alarm_time}`;
            form.appendChild(span);
        }
        else{
            let newSpan = document.getElementsByTagName("span")[0];
            newSpan.innerHTML = `Alarm is set for ${alarm_time}`;
        }
        
    }
})());

btn2.addEventListener("click", (function(){
    let myAlarm = null;

    return function(){
        myAlarm = document.getElementsByTagName("span")[0];
        if(myAlarm){
            myAlarm.remove();
            alarm_time = ":00";
            alarmIsSet = false;
            audio.pause();
            snooze.style.display = 'none';
        }
        else{
            alert("no alarm is set");
        }
    }
})());


//Snooze function:
const snooze = document.getElementById('snooze');

var btn3 = document.createElement("button");



btn3.setAttribute('type', 'button');
btn3.setAttribute('class', 'btn btn-warning');
btn3.setAttribute('id', 'snooze');
btn3.innerHTML = "Snooze";

snooze.appendChild(btn3);

snooze.style.display = 'none';

btn3.addEventListener("click", (function(){
    let c = 0;
    return function(){
        c++;
        let newTime = [];
        snooze.style.display = 'none';
        for(let i = 0; i < alarm_time.length; i++){
            newTime.push(alarm_time[i]);
        }
        let = needToIncrementHour = false;
        let = isHour23 = false;
        let hour = newTime[0] + newTime[1]; 
        let min = newTime[3] + newTime[4];
        hour = parseInt(hour);
        min = parseInt(min);
        if(hour === 23 && min > 49){
            hour = "00";
            min = min + 10 - 60;
            min = "0" + min;
        }
        else if(min >  49){
            if(hour < 10){
                hour = "0" + hour;
            }
            else{
                hour = "" + hour;
            }
            min = min + 10 - 60;
            min = "0" + min;
        }
        else{
            min = min + 10;
            min = "" + min;
            if(hour < 10){hour = "0" + hour;}
            else{hour = ""+hour;}
        }
        alarm_time = hour + ":" + min + ":00";
        myAlarm = document.getElementsByTagName("span")[0];
        myAlarm.innerHTML = `Snooze is set after 10 mins: ${alarm_time}`;
        audio.pause();
    }

})());