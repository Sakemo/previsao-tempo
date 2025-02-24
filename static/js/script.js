var dataAtual = new Date();
var hora = dataAtual.getHours();
if (hora < 10) hora = "0" + hora;
console.log("Hora atual: " + hora);
if(hora <= 18){
    document.getElementById('card-id').classList.add('card-night')
    document.getElementById('card-id').classList.remove('card')
    document.querySelector('.overlay').classList.add('overlay-night');
    document.querySelector('.overlay').classList.remove('overlay');
    document.getElementById('card-id').classList.remove('card-night')
    document.getElementById('card-id').classList.add('card-night-static')

}

async function checkWeather(city_name){
    var hora = dataAtual.getHours();
    const apiKey = '66b3d277565406f8858a468823db622b';
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid="+apiKey+"&units=metric";
    
    const response = await fetch(apiURL);
    var data = await response.json();

    console.log(data);

    if(data.cod == 200){
        document.getElementById('card-id').classList.remove('tranform-card-inv');
        document.getElementById('card-id').classList.add('tranform-card');
        document.getElementById('card-id').addEventListener('animationstart', ()=>{
            if(parseInt(data.main.humidity) < 49){
                document.getElementById('h_icon').src = 'images/raindrop.svg'
            }else{
                document.getElementById('h_icon').src = 'images/raindrops.svg'
            }
            if(parseInt(data.wind.speed) < 1){
                document.getElementById('w_icon').src = 'images/wind-beaufort-0.svg'
            }else if(parseInt(data.wind.speed) < 10){
                document.getElementById('w_icon').src = 'images/wind-beaufort-1.svg'
            }else if(parseInt(data.wind.speed) < 40){
                document.getElementById('w_icon').src = 'images/wind-beaufort-2.svg'
            }else if(parseInt(data.wind.speed) < 50){
                document.getElementById('w_icon').src = 'images/wind-beaufort-3.svg'
            }else if(parseInt(data.wind.speed) < 60){
                document.getElementById('w_icon').src = 'images/wind-beaufort-4.svg'
            }else if(parseInt(data.wind.speed) < 80){
                document.getElementById('w_icon').src = 'images/wind-beaufort-5.svg'
            }else if(parseInt(data.wind.speed) > 80){
                document.getElementById('w_icon').src = 'images/wind-alert.svg'
            }

            document.querySelector('.wheater').style.display = 'block';
            document.querySelector(".city").innerHTML = data.name + ' - ' + data.sys.country
            document.querySelector('.temp').innerHTML = parseFloat(data.main.feels_like) + 'ºC'
            document.querySelector('.humidity').innerHTML = parseInt(data.main.humidity) + '%'
            document.querySelector('.wind').innerHTML = parseInt(data.wind.speed) + '%'
            weatherIcon = document.querySelector('.weater-icon');
    
            if(data.weather[0].main == 'Clouds'){
                if (hora >= 18){
                    video = 'Clouds_Night'
                    weatherIcon.src = "images/fog-night.svg";
                }else{
                    video = 'Clouds_Day'
                    weatherIcon.src = "images/fog-day.svg";
                }
            }else if(data.weather[0].main == 'Clear'){
                if (hora >= 18){
                    video = 'Clear_Night'
                    weatherIcon.src = "images/clear-night.svg"
                }else{
                    video = 'Clear_Day'
                    weatherIcon.src = "images/clear-day.svg"
                }            
            }else if(data.weather[0].main == 'Rain'){
                if (hora >= 18){
                    video = 'Rain_Night'
                }else{
                    video = 'Rain_Day'
                }
                weatherIcon.src = "images/rain.svg"
            }else if(data.weather[0].main == 'Snow'){
                if (hora >= 18){
                    video = 'Snow_Night'
                }else{
                    video = 'Snow_Day'
                }            
                weatherIcon.src = "images/snow.svg"
            }else if(data.weather[0].main == 'Drizzle'){
                video = 'video'
                weatherIcon.src = "images/drizzle.svg"
            }else if(data.weather[0].main == 'Mist'){
                video = 'video'
                weatherIcon.src = "images/mist.svg"
            }
            document.getElementById('over').style.display = 'block';
            document.querySelector('.is_overlay').innerHTML = `        
            <video autoplay='true'  id="video" width="100%" height="auto"  loop="loop" preload="auto" muted="true" >
            <source src="videos/`+video+`.mp4">
            </video>`
        })

        }else if(data.cod == 404 || data.cod == 400){
            document.getElementById('card-id').classList.add('tranform-card-inv');
            document.getElementById('card-id').classList.remove('tranform-card');
            document.getElementById('card-id').addEventListener('animationstart',()=>{
                document.querySelector('.wheater').style.display = 'none';
            })
        }
    }

const search = document.getElementById('search');

search.addEventListener('keyup', ()=>{ 
    checkWeather(search.value)
})
