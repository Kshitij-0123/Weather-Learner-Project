const URL = "https://api.openweathermap.org/data/2.5/weather?appid=";
const apiKey = "ff6c77ac648e0989c3cd2293bfe5a4e0";
window.addEventListener("load", (event) => {
    event.preventDefault();
    let lat = 27.5;
    let lon = 77.6833;
    var map = L.map("map");
    var singleMarker = L.marker([lat, lon]);
    setLayers(lat, lon, map, singleMarker);
    fetch(URL + apiKey + "&lat=" + lat + "&lon=" + lon + "&units=metric" + "#")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setViewlatlong(lat, lon, map);
            changeLatlon(singleMarker, data);
        })
        .catch((error) => {
            console.log(error.message);
            alert("Enter valid name");
        });
    let city = document.querySelector("input");
    let btn = document.querySelector("button");
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        let cityV = city.value;
        let units = "metric";
        fetch(URL + apiKey + "&q=" + cityV + "&units=" + units + "#")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setViewlatlong(data.coord.lat, data.coord.lon, map);
                changeLatlon(singleMarker, data);
            })
            .catch((error) => {
                console.log(error.message);
                alert("Enter valid name");
            });
        city.value = "";
    });
});
function setViewlatlong(lat, lon, map) {
    map.setView([lat, lon], 13);
}
function setLayers(lat, lon, map, singleMarker) {

    var osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 25,
            attribution: "©OpenStreetMap",
        }
    );
    osm.addTo(map);
    var temp = L.tileLayer(
        "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=ff6c77ac648e0989c3cd2293bfe5a4e0",
        {
            maxZoom: 19,
            attribution: '&copy; <a href="http://owm.io">VANE</a>',
        }
    );
    var cloud = L.tileLayer(
        "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=ff6c77ac648e0989c3cd2293bfe5a4e0",
        {
            maxZoom: 19,
            attribution: '&copy; <a href="http://owm.io">VANE</a>',
        }
    );
    var pressure = L.tileLayer(
        "https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=ff6c77ac648e0989c3cd2293bfe5a4e0",
        {
            maxZoom: 19,
            attribution: '&copy; <a href="http://owm.io">VANE</a>',
        }
    );
    var precipitation = L.tileLayer(
        "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=ff6c77ac648e0989c3cd2293bfe5a4e0",
        {
            maxZoom: 19,
            attribution: '&copy; <a href="http://owm.io">VANE</a>',
        }
    );
    var baseMap = {
        "Temperature": temp,
        "Pressure": pressure,
        "Precipitation": precipitation,
        "Clouds": cloud,
    };
    var overlay = {
        "Marker": singleMarker,
    };
    L.control.layers(baseMap, overlay, { collapsed: false }).addTo(map);
}
function changeLatlon(singleMarker, data) {
    console.log(data);
    singleMarker.setLatLng([data.coord.lat, data.coord.lon]);
    singleMarker.bindPopup(`<pre>Temperature  ${data.main.temp}°C\n\nWind Speed  ${data.wind.speed}m/s\n\nPressure  ${data.main.pressure}mbar\n\nHumidity  ${data.main.humidity}%</pre>`).openPopup();
}