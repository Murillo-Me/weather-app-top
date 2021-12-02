const weather_api_key = '030d79bfdd59b3b78859d5b8aaa0cc03'
let weatherData = {city: null, currentTemp: null, humiditiy: null, pressure: null, feelsLike: null, minTemp: null, maxTemp: null}

async function getWeatherData(cityName) {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weather_api_key}`, {mode: 'cors'})
    let data = await response.json()

    console.log(data.main);

    return data
}

getWeatherData('Curitiba').then(data => {
    let currentTempElement = document.querySelector('.current-temp')
    let minTempElement = document.querySelector('.min-temp')
    let maxTempElement = document.querySelector('.max-temp')

    weatherData.currentTemp = kelvinToCelsius(data.main.temp).toFixed(1)
    weatherData.minTemp = kelvinToCelsius(data.main.temp_min).toFixed(1)
    weatherData.maxTemp = kelvinToCelsius(data.main.temp_max).toFixed(1)

    currentTempElement.innerText = weatherData.currentTemp + 'ºC'
    minTempElement.innerText = weatherData.minTemp + 'ºC'
    maxTempElement.innerText = weatherData.maxTemp + 'ºC'
})

function fahrenheitToCelsius(fahrenheitTemp) {
    return celsiusTemp = (fahrenheitTemp - 32) * 5/9
}

function kelvinToCelsius(kelvinTemp) {
    return celsiusTemp = (kelvinTemp - 273.15)
}