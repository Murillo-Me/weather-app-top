const weather_api_key = '030d79bfdd59b3b78859d5b8aaa0cc03'
let currentWeatherData = {temp: null, humidity: null, pressure: null, feelsLike: null, minTemp: null, maxTemp: null}
let forecastWeatherData = {temp: null, humidity: null, pressure: null, feelsLike: null, minTemp: null, maxTemp: null}

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthOfYear = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

let city = 'Curitiba'
let timezone = -10800

function runClock() {
    const date = getTimezoneDate()
    const d = {
                day: dayOfWeek[date.getDay()],
                month: monthOfYear[date.getMonth()],
                date: date.getDate(),
                year: date.getFullYear()}
    
    const dateText = document.querySelector('.current-day')
    dateText.innerText = `${d.day}, ${d.month} ${d.date}th, ${d.year}`

    const dateClock = document.querySelector('.current-time')
    dateClock.innerText = checkTime(date.getUTCHours()) + ':' + checkTime(date.getUTCMinutes())
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

function getTimezoneDate() {
    var date = new Date(); 
    var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    now_utc = now_utc + timezone*1000

    return new Date(now_utc);
}

function fahrenheitToCelsius(fahrenheitTemp) {
    return celsiusTemp = (fahrenheitTemp - 32) * 5/9
}

function kelvinToCelsius(kelvinTemp) {
    return celsiusTemp = (kelvinTemp - 273.15)
}

async function getCurrentWeatherData(cityName) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weather_api_key}`, {mode: 'cors'})
    let data = await response.json()

    return data
}

async function getForecastWeatherData(cityName) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weather_api_key}`, {mode: 'cors'})
    let data = await response.json()

    return data
}

runClock()

const cityElement = document.querySelector('.city-title')
cityElement.addEventListener('click', () => {
    const inputElement = document.createElement('input')
    cityElement.parentElement.append(inputElement)
    cityElement.style.display = 'none'

    inputElement.focus()
    inputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            city = inputElement.value
            cityElement.style.display = 'flex'
            cityElement.innerHTML = city + " <i class='fas fa-edit fa-xs'></i>"
            inputElement.remove()
            getData()
        }
    })
})

function getData() {

getCurrentWeatherData(city).then(data => {
    let tempElement = document.querySelector('.current-temp')
    let minTempElement = document.querySelector('.min-temp')
    let maxTempElement = document.querySelector('.max-temp')
    let humidityElement = document.querySelector('.current-humidity')

    currentWeatherData.temp = kelvinToCelsius(data.main.temp).toFixed(1)
    currentWeatherData.minTemp = kelvinToCelsius(data.main.temp_min).toFixed(1)
    currentWeatherData.maxTemp = kelvinToCelsius(data.main.temp_max).toFixed(1)
    currentWeatherData.humidity = data.main.humidity
    timezone = data.timezone

    tempElement.innerHTML = "<i class='fas fa-thermometer-half'></i>" + currentWeatherData.temp + 'ºC'
    minTempElement.innerText = currentWeatherData.minTemp + 'ºC'
    maxTempElement.innerText = currentWeatherData.maxTemp + 'ºC'
    humidityElement.innerHTML = "<i class='fas fa-tint'></i> " + currentWeatherData.humidity + "%"
})

getForecastWeatherData(city).then(data => {
    console.log(data)
})

}

setInterval(runClock, 1000);
getData()