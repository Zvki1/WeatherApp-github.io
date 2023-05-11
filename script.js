const notificationelement=document.querySelector(".notification"); //selecting the notification class from the html file
const iconElement=document.querySelector(".weather-icon"); //selecting the weather-icon class from the html file
const tempElement=document.querySelector(".temperature-value p"); //selecting the temperature-value class from the html file
const descElement=document.querySelector(".temperature-description p"); //selecting the temperature-description class from the html file
const locationElement=document.querySelector(".location p");

const weather={}; //creating an empty object
weather.temperature={
    unit:"celsius"
}

//const and vars
const KELVIN=273; //kelvin is a constant value
const key="82005d27a116c2880c8f0fcb866998a0";
//check if browser supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError)
}else{
   notificationelement.style.display="block";
   notificationelement.innerHTML="<p>Browser don't Support the geolocalisation<\p>"; 
}

//setuser position
function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;

    getWeather(latitude,longitude);

}
// exception of erro
function showError(error){
    notificationelement.style.display="block";
    notificationelement.style.innerHTML=`<p> ${error.message}<\p>`;
}
// get weather
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
        .then(function(response){
            let data =response.json();
            return data
    })
    .then(function(data){
        weather.temperature.value=Math.floor(data.main.temp - KELVIN);
        weather.description=data.weather[0].description;
        weather.iconId=data.weather[0].icon;
        weather.city=data.name;
        weather.country=data.sys.country;
    })
    .then(function(){
        displayWeather();
       
    });
}
//display weather to ui 
function displayWeather(){
    iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML=weather.description;
    locationElement.innerHTML=`${weather.city},${weather.country}`;
}
