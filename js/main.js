//London coordinate
let lat = 51.509865;
let lon = -0.118092;

function success(position){    
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat, lon);
  showPosition1(lat, lon);  
}

function error(){
  showPosition1(lat, lon);  
}

function getLocation() {
      navigator.geolocation.getCurrentPosition(success, error);         
}

getLocation();

let tempC;
let tempF;
let windKm;
let windMs;

function updateTemp(){
    let selectTemp = document.querySelector('.select__temp');    
    let selectTempValue = selectTemp.options[selectTemp.selectedIndex].value;    
    if (selectTempValue == "far") 
        document.querySelector('.temperature').innerHTML = Math.round(tempF) + ' F';    
        else  document.querySelector('.temperature').innerHTML = Math.round(tempC) + '&deg;' + 'C';    
}

function celToFar(cel){
  return cel*9/5+32;
}
function meterToKmeter(m){
  return m*3600/1000;
}

function updateKm(){
  let selectWind = document.querySelector('.select__wind');    
  let selectWindValue = selectWind.options[selectWind.selectedIndex].value;    
  console.log(selectWindValue);
  if (selectWindValue == "ms") 
      document.querySelector('.wind').innerHTML = Math.round(windMs) + ' m/s';    
      else  document.querySelector('.wind').innerHTML = Math.round(windKm) + ' km/h';    
}

function showPosition1(lat, lon){        
    const st = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=609fbf649cc9b0275d3699be22b12807&units=metric';
    const dat = fetch(st)
    .then (function (resp) { return resp.json() })               
    .then (function (data) {
        tempC = data.main.temp;
        tempF = celToFar(tempC);
        windMs = data.wind.speed;
        windKm = meterToKmeter(windMs);
        document.querySelector('.location__address').innerText = data.name;                
        document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '&deg;' + 'C';
        document.querySelector('.weather__img').src="http://openweathermap.org/img/wn/" + data.weather[0]['icon'] + "@2x.png";
        document.querySelector('.wind').innerText = Math.round(data.wind.speed) + 'm/s';        
        document.querySelector('.humidity').innerText = data.main.humidity + '%';
        document.querySelector('.pressure').innerText = data.main.pressure + 'Pa';
        document.querySelector('.weather__description').innerText = data.weather[0]['description'];                        
    })        
}



