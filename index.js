let temp_container = document.querySelector('.temp');
let weather_desc   = document.querySelector('.weather-desc');
let today_weather  = document.querySelector('.today-next-weather');
async function fetchData(url) {
    let response = await fetch(url);
    return response.json(); 
}

function toCelsius(kelvin) {
    return kelvin - 273.15;
}

function setIcon(weather) {
    
    switch (weather) {
        case "Clouds":
            return `<i class="fas fa-cloud"></i>`
            break;  
        case "Drizzle": 
            return `<i class="fas fa-cloud-rain"></i>`   
            break;
        case "Rain":
            return `<i class="fas fa-cloud-showers-heavy"></i>`
            break;
        case "Snow":
            return `<i class="fas fa-snowflake"></i>`
        default:
            return `<i class="fas fa-sun"></i>`
            break;
    }
}

// Get current weather
(async () => {

    let data = await fetchData("https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=79c32c0c110ffeab2d3cd53a90218dda");
    let desc = data.weather[0].main;
    let temp = toCelsius(data.main.temp);


    weather_desc.innerHTML = `${desc}  ${setIcon(desc)}`;
    temp_container.textContent = `${Math.round(temp)}°C`;
})();


// Get weather of next hours
(async () => {
    let weather_data = await fetchData("https://api.openweathermap.org/data/2.5/forecast?q=Paris&units=metric&appid=79c32c0c110ffeab2d3cd53a90218dda");
    let weather_arr = weather_data.list;
    
    // Get current date
    let time =  new Date().getTime();
    let time_today = new Date(time);
    let day_day = (day) => {
        switch (day) {
            case 1:
                return "Lundi";
                break;
            case 2:
                return "Mardi";
                break;
            case 3:
                return "Mercredi";
                break;
            case 4:
                return "Jeudi";
                break;
            case 5:
                return "Vendredi";
                break;
            case 6:
                return "Samedi";
                break;

            default:
                return "Dimanche";
                break;
        }
    };

    // Show current date
    let today_date_container = document.querySelector('.today-date');
    today_date_container.innerHTML = `${day_day(time_today.getDay())} ${time_today.getDate()} | ${time_today.getHours()}:${time_today.getMinutes()}`;
    

    // Show next weather
    let weather_container = document.querySelector('.today-next-weather');
    weather_container.innerHTML = ""

    weather_arr.forEach(data => {
        var date = new Date(data.dt*1000); // Get date of predicated meteo 
        let temp  = data.main.temp;
        m = date.getMonth()+1,
        h = date.getHours(),
        d = date.getDate();
        xdate = [(d < 10) ? '0' + d : d, (m < 10) ? '0' + m : m, date.getFullYear()].join('/');

        weather_container.innerHTML += `
            <div class="next-weather">
                <h2>${Math.round(temp)}°C</h2>
                <p>${xdate}</p>
                <p> ${h}h</p>
            </div>`;
            
        
    });


    if (weather_container.textContent == "") {
        weather_container.style.display = "none"
    }

})();
