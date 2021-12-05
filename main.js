const weather_api_key = '030d79bfdd59b3b78859d5b8aaa0cc03'
let currentWeatherData = {temp: null, humidity: null, pressure: null, feelsLike: null, minTemp: null, maxTemp: null}
let forecastWeatherData = {temp: null, humidity: null, pressure: null, feelsLike: null, minTemp: null, maxTemp: null}

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthOfYear = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

let city = 'Curitiba'

function runClock() {
    const date = new Date();
    const d = {
                day: dayOfWeek[date.getDay()],
                month: monthOfYear[date.getMonth()],
                date: date.getDate(),
                year: date.getFullYear()}
    
    const dateText = document.querySelector('.current-day')
    dateText.innerText = `${d.day}, ${d.month} ${d.date}th, ${d.year}`

    const dateClock = document.querySelector('.current-time')
    dateClock.innerText = checkTime(date.getHours()) + ':' + checkTime(date.getMinutes())
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

function fahrenheitToCelsius(fahrenheitTemp) {
    return celsiusTemp = (fahrenheitTemp - 32) * 5/9
}

function kelvinToCelsius(kelvinTemp) {
    return celsiusTemp = (kelvinTemp - 273.15)
}

async function getCurrentWeatherData(cityName) {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weather_api_key}`, {mode: 'cors'})
    let data = await response.json()

    return data
}

async function getForecastWeatherData(cityName) {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weather_api_key}`, {mode: 'cors'})
    let data = await response.json()

    return data
}

runClock()

getCurrentWeatherData(city).then(data => {
    let tempElement = document.querySelector('.current-temp')
    let minTempElement = document.querySelector('.min-temp')
    let maxTempElement = document.querySelector('.max-temp')
    let humidityElement = document.querySelector('.current-humidity')

    currentWeatherData.temp = kelvinToCelsius(data.main.temp).toFixed(1)
    currentWeatherData.minTemp = kelvinToCelsius(data.main.temp_min).toFixed(1)
    currentWeatherData.maxTemp = kelvinToCelsius(data.main.temp_max).toFixed(1)
    currentWeatherData.humidity = data.main.humidity

    tempElement.innerHTML = "<i class='fas fa-thermometer-half'></i>" + currentWeatherData.temp + 'ºC'
    minTempElement.innerText = currentWeatherData.minTemp + 'ºC'
    maxTempElement.innerText = currentWeatherData.maxTemp + 'ºC'
    humidityElement.innerHTML = "<i class='fas fa-tint'></i> " + currentWeatherData.humidity + "%"
})

getForecastWeatherData(city).then(data => {
    console.log(data)
})

setInterval(runClock, 1000);