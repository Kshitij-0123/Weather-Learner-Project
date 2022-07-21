const URL = "https://api.openweathermap.org/data/2.5/weather?appid=";
const imageURL = "https://openweathermap.org/img/wn/";
let city = document.querySelector("input");
let btn = document.querySelector("button");
let unit = document.querySelector("select");
var cityV = "";
const apiKey = "ff6c77ac648e0989c3cd2293bfe5a4e0";
var cont2 = document.querySelector(".container-app");
var cont1 = document.querySelector(".container-1");
cont2.style.display = "none";
setTimeout(function () {
    cont2.style.display = "block";
    cont1.style.display = "none";
    setTimeout(function () {
        let sky = document.querySelectorAll(".sky");
        for (let i = 0; i < sky.length; i++)
            sky[i].style.display = "none";
    }, 3000);
}, 6000);
btn.addEventListener("click", (event) => {
    btn.classList.add("clicked-s");
    event.preventDefault();
    cityV = city.value;
    let units = unit.value;
    console.log(units);
    fetch(URL + apiKey + "&q=" + cityV + "&units=" + units + "#").then((res) => { return res.json() }).then((data) => { addImage(data.weather[0].main); displayData(data, units) }).catch((error) => {console.log(error.message); alert("Enter valid name")});
    city.value = "";
    setTimeout(() => {
        btn.classList.remove("clicked-s");
    }, 2000);

});
function addImage(mainW) {
    let image = document.querySelector(".image");
    let src = "";
    let pos = "center";
    switch (mainW) {
        case "Clouds":
            src = "./images/Cloud.jpg";
            break;
        case "Clear":
            src = "./images/Clear.png";
            break;
        case "Drizzle":
            src = "./images/drizzle1.jpg";
            break;
        case "Dust":
            src = "./images/Dust.jpg";
            break;
        case "Fog":
            src = "./images/fog1.jpg";
            break;
        case "Haze":
            src = "./images/Haze.jpg";
            break;
        case "Mist":
            src = "./images/Mist.jpg";
            break;
        case "Rain":
            src = "./images/Rain3.jpg";
            break;
        case "Sand":
            src = "./images/Sand.jpg";
            break;
        case "Smoke":
            src = "./images/Smoke.jpg";
            break;
        case "Snow":
            src = "./images/Snow.jpg";
            pos = "bottom";
            break;
        case "Thunderstorm":
            src = "./images/Thunderstorm.jpg";
            pos = "bottom";
            break;
        default: src = "";
            break;
    }
    image.style.backgroundImage = "url(" + src + ")";
    image.style.backgroundSize = "cover";
    image.style.backgroundPosition = pos;
    image.opacity = "0.4";
}
function displayData(APID, units) {
    //for temperature
    let unitT = tempSet(units);
    let unitS = speedSet(units);
    var temp = document.querySelectorAll(".temp h3");
    temp[0].innerHTML = "Temperature: " + APID.main.temp + unitT;
    temp[1].innerHTML = "Minimum temperature: " + APID.main.temp_min + unitT;
    temp[2].innerHTML = "Maximum temperature: " + APID.main.temp_max + unitT;
    //for wind speed
    var wind = document.querySelectorAll(".wind-speed h3");
    wind[0].innerHTML = "Wind speed: " + APID.wind.speed + unitS;
    wind[1].innerHTML = "Degree: " + APID.wind.deg + "°";
    wind[2].innerHTML = "gust speed: " + APID.wind.gust + unitS;
    //for description
    var des = document.querySelectorAll(".description h3");
    des[0].innerHTML = APID.weather[0].description;
    des[0].style.textAlign = "center";
    var icon = APID.weather[0].icon;
    var ico = document.querySelector(".description img");
    ico.setAttribute("src", imageURL + icon + "@2x.png");
    //for pressure and humidity
    var ph = document.querySelectorAll(".pres-hum h3");
    ph[0].innerHTML = "Pressure: " + APID.main.pressure + " mbar";
    ph[1].innerHTML = "Humidity: " + APID.main.humidity + "%";
    //for main
    var m = document.querySelector(".mainP h1");
    var d = document.querySelector(".mainP p");
    var date = new Date().toDateString();
    d.innerHTML = date;
    m.innerHTML = APID.weather[0].main;
    //for position
    posFinder(APID.coord.lat, APID.coord.lon);

}
window.addEventListener("load", () => {
    var urlLL = "";
    window.navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        posFinder(lat, lon);
        console.log(position);
        urlLL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
        fetch(urlLL).then((res) => { return res.json() }).then((data) => { addImage(data.weather[0].main); displayData(data, "metric") }).catch((error) => console.log(error.message));
    });


});
function posFinder(lat, lon) {
    var h2Ar = document.querySelectorAll(".latC h3");
    h2Ar[0].innerHTML = "Lattitude:" + parseFloat(lat).toFixed(2) + "°";
    h2Ar[1].innerHTML = "Longitude:" + parseFloat(lon).toFixed(2) + "°";
}
function tempSet(value) {
    let t = "";
    if (value == "imperial")
        t = "°F";
    else if (value == "standard")
        t = "K";
    else
        t = "°C";
    return t;
}
function speedSet(value) {
    let v = "";
    if (value == "standard" || value == "metric")
        v = "m/s";
    else
        v = "MPH";
    return v;
}
