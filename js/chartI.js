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
    for(let i=0;i<data.list.length;i++){
        let day=data.list[i].dt_txt.slice(0,11);
        let hour=data.list[i].dt_txt.slice(11,13);
        days.add(allDay[new Date(day).getDay()]);
        if(hour==="09")
        Temp_main_morn.push(data.list[i].main.temp);
        else if(hour==="21")
            Temp_main_night.push(data.list[i].main.temp);
        
    }
    days.delete(allDay[new Date(data.list[0].dt_txt.slice(0,11)).getDay()]);
    const label=Array.from(days);
    var char=document.getElementById("lineC");
    var lineChart=new Chart(char,{
        type: "line",
        data: {
            labels: label,
            datasets: [
                {
                    label: "Temp_morning",
                    data: Temp_main_morn,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth:4
                },
                {
                    label: "Temp_night",
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