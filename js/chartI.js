const allDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
window.addEventListener("load", lat_lon);
let city = document.querySelector("input");
let search = document.querySelector("button");
search.addEventListener("click", (event) => {
    event.preventDefault();
    let URL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&cnt=40&appid=baffe54e8405da80be9e6f51f7808cae&units=metric";
    fetch(URL).then((res) => { return res.json() }).then((data) => { canvasD(); exportdata(data); }).catch((error) => { console.log(error.message); alert("Enter valid name"); document.location.reload() });
    city.value = "";
})
function exportdata(data) {
    let days = new Set();
    let Temp_main_morn = [];
    let Temp_main_night = [];
    let imageB = "";
    for (let i = 0; i < data.list.length; i++) {
        let day = data.list[i].dt_txt.slice(0, 11);
        let hour = data.list[i].dt_txt.slice(11, 13);
        days.add(allDay[new Date(day).getDay()]);
        if (hour === "09")
            Temp_main_morn.push(data.list[i].main.temp);
        else if (hour === "21")
            Temp_main_night.push(data.list[i].main.temp);

    }
    imageB = data.list[parseInt((24 - new Date().getHours()) / 3) + 3].weather[0].main;
    addChartBack(imageB);
    days.delete(allDay[new Date(data.list[0].dt_txt.slice(0, 11)).getDay()]);
    const label = Array.from(days);
    let can = document.createElement("canvas");
    can.setAttribute("id", "lineC");
    can.setAttribute("width", "400px");
    document.querySelector(".chartBox").appendChild(can);
    var char = document.getElementById("lineC");
    var lineChart = new Chart(char, {
        type: "line",
        data: {
            labels: label,
            datasets: [
                {
                    label: "Morning_Temperature",
                    data: Temp_main_morn,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth: 4
                },
                {
                    label: "Night_Temperature",
                    data: Temp_main_night,
                    backgroundColor: 'transparent',
                    borderColor: 'blue',
                    borderWidth: 4
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                y: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function addChartBack(word) {
    let image = document.querySelector("#chart_back");
    let src = "";
    let pos = "center";
    switch (word) {
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
        case "Ash":
            src = "./images/Ash.jpg";
            break;
        case "Tornado":
            src = "./images/Tornado.jpg";
            break;
        case "Squall":
            src = "./images/Squall.jpg";
            break;
        default: src = "";
            break;
    }
    image.style.backgroundImage = "url(" + src + ")";
    image.style.backgroundSize = "cover";
    image.style.backgroundPosition = pos;
}
function canvasD() {
    let canD = document.getElementById("lineC");
    document.querySelector(".chartBox").removeChild(canD);
}
function lat_lon() {
    let lat = 27.5;
    let lon = 77.6833;
    let URL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=40&appid=baffe54e8405da80be9e6f51f7808cae&units=metric";
    fetch(URL).then((res) => { return res.json() }).then((data) => { exportdata(data); });
    let cont2 = document.querySelector(".container-app");
    let cont1 = document.querySelector(".container-1");
    cont2.style.display = "none";
    setTimeout(function () {
        cont2.style.display = "block";
        cont1.style.display = "none";
    }, 3000);
}