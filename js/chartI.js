const allDay=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
window.addEventListener("load",()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        let lat=position.coords.latitude;
        let lon=position.coords.longitude;
        let URL="https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&cnt=40&appid=baffe54e8405da80be9e6f51f7808cae&units=metric";
        fetch(URL).then((res)=>{return res.json()}).then((data)=>{exportdata(data)});
    },function (){
        alert("Cannot get location");
    },{timeout:20000, enableHighAccuracy:true});
});

function exportdata(data){
    const days=new Set();
    const Temp_main_morn=[];
    const Temp_main_night=[];
    let imageB="";
    for(let i=0;i<data.list.length;i++){
        let day=data.list[i].dt_txt.slice(0,11);
        let hour=data.list[i].dt_txt.slice(11,13);
        days.add(allDay[new Date(day).getDay()]);
        if(hour==="09")
        Temp_main_morn.push(data.list[i].main.temp);
        else if(hour==="21")
            Temp_main_night.push(data.list[i].main.temp);
        
    } 
    imageB=data.list[0].weather[0].main;
    addChartBack(imageB);
    days.delete(allDay[new Date(data.list[0].dt_txt.slice(0,11)).getDay()]);
    const label=Array.from(days);
    var char=document.getElementById("lineC");
    var lineChart=new Chart(char,{
        type: "line",
        data: {
            labels: label,
            datasets: [
                {
                    label: "Morning_Temperature",
                    data: Temp_main_morn,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth:4
                },
                {
                    label: "Night_Temperature",
                    data: Temp_main_night,
                    backgroundColor: 'transparent',
                    borderColor: 'blue',
                    borderWidth:4
                }
            ]
        },
        options:{
            maintainAspectRatio: false,
            elements:{
                line:{
                    tension:0
                }
            },
            scales:{
                y: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function addChartBack(word){
    let image=document.querySelector("#chart_back");
    let src="";
    let pos="center";
    switch (word) {
        case "Clouds":
        src="./images/Cloud.jpg";
        break;
        case "Clear":
        src="./images/Clear.png";
        break;
        case "Drizzle":
        src="./images/drizzle1.jpg";
        break;
        case "Dust":
        src="./images/Dust.jpg";
        break;
        case "Fog":
        src="./images/fog1.jpg";
        break;
        case "Haze":
        src="./images/Haze.jpg";
        break;
        case "Mist":
        src="./images/Mist.jpg";
        break;
        case "Rain":
        src="./images/Rain2.jpg";
        break;
        case "Sand":
        src="./images/Sand.jpg";
        break;
        case "Smoke":
        src="./images/Smoke.jpg";
        break;
        case "Snow":
        src="./images/Snow.jpg";
        pos="bottom";
        break;
        case "Thunderstorm":
        src="./images/Thunderstorm.jpg";
        pos="bottom";
        break;
        default: src="";
        break;
    }
    console.log(word);
    image.style.backgroundImage="url("+src+")";
    image.style.backgroundSize="cover";
    image.style.backgroundPosition=pos;
}