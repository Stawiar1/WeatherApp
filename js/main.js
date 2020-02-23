const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&&appid=cc53ef495eeccbb7a5e8674d6eea9e3c';
const units = '&units=metric';
let city;
let url; 

const getWeather = () => {

    city = (!input.value) ? 'New York' : input.value;
    url = apiLink + city + apiKey + units;
    
    axios.get(url)
        .then(response => {
        const temp = response.data.main.temp;
        const hum = response.data.main.humidity;
        const status = Object.assign({}, ...response.data.weather) // "rozsmarowanie" tablicy (W API status pogody jest w tablicy opakowany w obiekt)

        cityName.textContent = response.data.name;
        temperature.textContent = temp.toFixed() + '°C';
        humidity.textContent = hum + '%';

        warning.textContent = '';
        input.value = '';

        //sprawdzenie pogody na podstawie fragmentu ID z OpenWeatherAPI
        //dodanie odpowiedniego zdjęcia na podstawie ID
        if(status.id >= 200 && status.id < 300){
            weather.textContent = 'Burzowo'
            photo.setAttribute('src','../img/thunderstorm.png')  
        }else if(status.id >= 300 && status.id < 400){
            weather.textContent = 'Deszczowo'
            photo.setAttribute('src',"../img/drizzle.png") 
        }else if(status.id >= 500 && status.id < 600){
            weather.textContent = 'Mocny Deszcz'
            photo.setAttribute('src',"../img/rain.png")
        }else if(status.id >= 600 && status.id < 700){
            weather.textContent = 'Śnieg'
            photo.setAttribute('src',"../img/ice.png")
        }else if(status.id >= 700 && status.id < 800){
            weather.textContent = 'Mgła'
            photo.setAttribute('src',"../img/fog.png")
        }else if(status.id >= 800 && status.id < 900){
            weather.textContent = 'Pochmurnie'
            photo.setAttribute('src',"../img/cloud.png")
        }else if(status.id === 800){
            weather.textContent = 'Czyste niebo'
            photo.setAttribute('src',"../img/sun.png")
        }else{
            photo.setAttribute('src', '../img/unknown.png')
        }
        
    })
    .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta!')

}
getWeather();
btn.addEventListener('click', getWeather)
