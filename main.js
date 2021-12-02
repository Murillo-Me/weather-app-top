weather_api_key = '030d79bfdd59b3b78859d5b8aaa0cc03'

async function getWeatherData(cityName) {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weather_api_key}`, {mode: 'cors'})
    let data = await response.json()

    console.log(data.main);

    return data
}

getWeatherData('Washington').then(data => {
    let textElement = document.querySelector('p')
    textElement.innerText += data.main.temp
})