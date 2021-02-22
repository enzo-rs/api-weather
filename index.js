let temp_container = document.querySelector('.temp');
let weather_desc   = document.querySelector('.weather-desc');

async function fetchData(url) {
    let response = await fetch(url);
    return response.json(); 
}

function toCelsius(kelvin) {
    return kelvin - 273.15;
}
(async () => {

    let data = await fetchData("http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=79c32c0c110ffeab2d3cd53a90218dda");
    let desc = data.weather[0].main;
    let temp = toCelsius(data.main.temp);


    weather_desc.innerHTML = desc + ' <i class="fas fa-sun"></i>';
    temp_container.textContent = `${temp.toFixed(2)}°C`;
})();