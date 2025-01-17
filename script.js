

const apiKey = '238b7afa7a1adbfcccbb4fa4a086858d'; 

document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        loader.classList.add("hidden");
        console.log(data);
        displayWeather(data);
    } catch (error) {
      loader.classList.add("hidden");
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const { main, weather, wind } = data;
    // console.log(data);
    if(weather[0].main === "Clear"){
        const body = document.getElementById("body");
        body.classList.add("bg-clear")
    }
    else if(weather[0].main === "Clouds"){
        const body = document.getElementById("body");
        body.classList.add("bg-clouds")
    }
    else if(weather[0].main === "Drizzle"){
        const body = document.getElementById("body");
        body.classList.add("bg-drizzle")
    }
    else if(weather[0].main === "Rain"){
        const body = document.getElementById("body");
        body.classList.add("bg-rain")
    }
    else if(weather[0].main === "Snow"){
        const body = document.getElementById("body");
        body.classList.add("bg-snow")
    }
    else if(weather[0].main === "Thunderstorm"){
        const body = document.getElementById("body");
        body.classList.add("bg-thunderstorm")
    }
    const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    
    // <img src="${weatherIconUrl}" alt="${weather[0].description}" class="weather-icon">
    weatherDisplay.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p style="font-size: 52px;font-weight: 900;line-height: 0px;">${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}