const URL="https://api.openweathermap.org/data/2.5/weather?appid=";
const imageURL="https://openweathermap.org/img/wn/";
let city=document.querySelector("input");
let btn=document.querySelector("button");
let unit=document.querySelector("select");
var cityV="";
const apiKey="ff6c77ac648e0989c3cd2293bfe5a4e0";
var cont2=document.querySelector(".container-app");
var cont1=document.querySelector(".container-1");
cont2.style.display="none";
setTimeout(function (){
    cont2.style.display="block";
    cont1.style.display="none";
},6000);
btn.addEventListener("click",(event)=>{
    btn.classList.add("clicked-s");
    event.preventDefault();
    cityV=city.value;
    let units=unit.value;
    console.log(units);
    fetch(URL+apiKey+"&q="+cityV+"&units="+units+"#").then((res)=>{return res.json()}).then((data)=>{addImage(data.weather[0].main); displayData(data)}).catch((error) => console.log(error.message));
    city.value="";
    setTimeout(()=>{
        btn.classList.remove("clicked-s");
    },5000);
    
});
function addImage(mainW){
    let image=document.querySelector(".image");
    let src="";
    switch (mainW) {
        case "Clouds":
        src="../images/Cloud.avif";
        break;
        case "Clear":
        src="../images/Clear.avif";
        break;
        case "Drizzle":
        src="../images/Drizzle.avif";
        break;
        case "Dust":
        src="../images/Dusty.avif";
        break;
        case "Fog":
        src="../images/Fog.avif";
        break;
        case "Haze":
        src="../images/Haze.avif";
        break;
        case "Mist":
        src="../images/Mist.avif";
        break;
        case "Rain":
        src="../images/Rain.avif";
        break;
        case "Sand":
        src="../images/Sand.avif";
        break;
        case "Smoke":
        src="../images/Smoke.avif";
        break;
        case "Snow":
        src="../images/Snow.avif";
        break;
        case "Thunderstorm":
        src="../images/Thunderstorm.avif";
        break;
        default: src="";
        break;
    }
    console.log(src,mainW);
    image.style.backgroundImage="url("+src+")";
    image.style.backgroundSize="cover";
    image.style.backgroundPosition="center";
}
function displayData(APID){
    //for temperature
    var temp=document.querySelectorAll(".temp h3");
    temp[0].innerHTML="Temperature: "+APID.main.temp;
    temp[1].innerHTML="Minimum temperature: "+APID.main.temp_min;
    temp[2].innerHTML="Maximum temperature: "+APID.main.temp_max;
    //for wind speed
    var wind=document.querySelectorAll(".wind-speed h3");
    wind[0].innerHTML="Wind speed: "+APID.wind.speed;
    wind[1].innerHTML="Degree: "+APID.wind.deg;
    wind[2].innerHTML="gust speed: "+APID.wind.gust;
    //for description
    var des=document.querySelectorAll(".description h3");
    des[0].innerHTML="Description: "+APID.weather[0].description;
    var icon=APID.weather[0].icon;
    var ico=document.querySelector(".description img");
    ico.setAttribute("src",imageURL+icon+"@2x.png");
    //for pressure and humidity
    var ph=document.querySelectorAll(".pres-hum h3");
    ph[0].innerHTML="Pressure: "+APID.main.pressure;
    ph[1].innerHTML="Humidity: "+APID.main.humidity;
    //fpr main
    var m=document.querySelector(".mainP h1");
    var d=document.querySelector(".mainP p");
    var date=new Date().toDateString();
    d.innerHTML=date;
    m.innerHTML=APID.weather[0].main;
    
}
window.addEventListener("load",()=>{
    var urlLL="";
    navigator.geolocation.getCurrentPosition((position)=>{
        let lat=position.coords.latitude;
        let lon=position.coords.longitude;
        var h2Ar=document.querySelectorAll(".latC h2");
        h2Ar[0].innerHTML=h2Ar[0].innerHTML+" "+Math.round(lat)+"°";
        h2Ar[1].innerHTML=h2Ar[1].innerHTML+" "+Math.round(lon)+"°";
        urlLL="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey;
        fetch(urlLL).then((res)=>{return res.json()}).then((data)=>{addImage(data.weather[0].main); displayData(data)}).catch((error) => console.log(error.message));
    });
    

});
