window.addEventListener("load",()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        let lat=position.coords.latitude;
        let lon=position.coords.longitude;
        exportingData(lat,lon);
    });
});

function exportingData(lat,lon){
    const pathCSV="../csv/Pressure_humfinalLatLon.csv";
    d3.csv(pathCSV).then(function (datapoints){
        const name=[];
        const pres=[];
        const hum=[];
        for(let i=0;i<datapoints.length;i++)
            {
                if(checkRange(datapoints[i].cityCoordLat,datapoints[i].cityCoordLon,lat,lon))
                {name.push(datapoints[i].cityName)
                pres.push(datapoints[i].mainPressure);
                hum.push(datapoints[i].mainHumidity);}
            }
        console.log(name.length);
        let char=document.getElementById("lineC");
        var lineChart=new Chart(char,{
            type: "line",
            data: {
                labels: name,
                datasets: [
                    {
                        label: "pressure",
                        data: pres,
                        backgroundColor: 'transparent',
                        borderColor: 'red',
                        borderWidth:4
                    },
                    {
                        label: "humidity",
                        data: hum,
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
                        tension:0.4
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
    });
}
function checkRange(dataLat,dataLon,lat,lon){
    if(dataLat<=lat+0.8 && dataLat>=lat && dataLon>=lon && dataLon<=lon+0.8)
        return true;
    else
        return false;
}