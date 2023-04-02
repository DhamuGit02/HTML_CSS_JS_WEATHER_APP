document.addEventListener('DOMContentLoaded', function(){successCallBack()})
const weatherObject = {
    api_key:'d8fd9cbd5f3cdac91720158fa588a3cc',
    fetchWeatherByGeolocation: (lat, lon) => {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&units=metric&lon='+ lon + '&appid=' + weatherObject.api_key)
            .then((res) => res.json())
            .then((data) => {
                const {name} = data
                const {visibility} = data
                const {main} = data.weather[0]
                const {temp, feels_like, pressure, humidity} = data.main
                const {speed} = data.wind
                const temperature = document.querySelector('.temp')
                const visibilityElement = document.querySelector('#visibility')
                const weatherDesc = document.getElementsByClassName('list')
                const skyDesc = document.querySelector('.sky')
                temperature.innerHTML = String(Math.floor(Number(temp)) + '<sup>°</sup>')
                visibilityElement.innerHTML = String('Visibility:' + Math.ceil(Number(visibility) / 10**3) + 'KM')
                weatherDesc[0].textContent = 'Humidity: ' + humidity.toString() + '%'
                weatherDesc[1].textContent = 'Pressure: ' + Number(pressure) / 1000 + ' atm'
                weatherDesc[2].textContent = 'Wind Speed: ' + speed + 'm/s'
                weatherDesc[3].innerHTML = 'Real Feel: ' + feels_like + '<sup>°</sup>C'
                weatherDesc[4].textContent = 'City: ' + name.toString()
                skyDesc.innerHTML = String(main)
            })
    },
}
function successCallBack(pos) {
    weatherObject.fetchWeatherByGeolocation(pos.coords.latitude, pos.coords.longitude)
    // weatherObject.fetchWeatherByGeolocation(19.9975, 73.7898)
    let time = setInterval(function() {
        let sky = document.querySelector('.sky')
        const date = new Date()
        const hours = date.getHours()
        const timeString = date.toLocaleTimeString("en-us", {hour12:false})
        const hour12Format = date.toLocaleTimeString()
        timeText.textContent = String(hour12Format)
        //dawn
        if(hours >= 5 && hours < 9) display.style.backgroundImage = dayNightCycle[0]
        //morning
        else if(hours >= 9 && hours < 12) display.style.backgroundImage = dayNightCycle[1]
        //afternoon
        else if(hours >= 12 && hours < 17) display.style.backgroundImage = dayNightCycle[2]
        //evening
        else if(hours >= 17 && hours < 20) {
            if(sky.innerHTML.includes('Rain')) display.style.backgroundImage = 'url(./images/sunset-rain.jpg)'
            else display.style.backgroundImage = dayNightCycle[3]
        }
        else {
            if(sky.innerHTML.includes('Rain')) display.style.backgroundImage = 'url(./images/night-rain.jpg)'
            else display.style.backgroundImage = dayNightCycle[4]
        }
    }, 1000)
    const timeText = document.querySelector(".time")
    const display = document.querySelector("#main-body")
    const dayNightCycle = ["url('./images/dawn.jpg')", "url('./images/morning.jpg')", "url('./images/afternoon (2).jpg')", "url('./images/sunset.jpg')","url('./images/night.jpg')"]
    
}
function errorCallBack(err) {
    alert(err)
}
navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack)

