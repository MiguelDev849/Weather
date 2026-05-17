// API KEY
const apikey = "96d2020b8b1af0ef49a1eba05515f6f5";

// URL da API
const apiWeatherURL =
"https://api.openweathermap.org/data/2.5/weather?q=";

// Elementos
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

// Função principal
const getWeatherData = async (city) => {

    try {

        const apiWeather =
        `${apiWeatherURL}${city}&appid=${apikey}&units=metric&lang=pt_br`;

        const res = await fetch(apiWeather);

        const data = await res.json();

        console.log(data);

        // Se cidade não existir
        if(data.cod == "404"){

            alert("Cidade não encontrada!");
            return;
        }

        // Atualizar dados
        cityElement.innerText = data.name;

        tempElement.innerText =
        parseInt(data.main.temp);

        descElement.innerText =
        data.weather[0].description;

        weatherIconElement.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        humidityElement.innerText =
        `${data.main.humidity}%`;

        windElement.innerText =
        `${data.wind.speed} km/h`;

    } catch(error){

        console.log(error);

        alert("Erro ao buscar clima");
    }
};

// Clique no botão
searchBtn.addEventListener("click", () => {

    const city = cityInput.value;

    if(!city) return;

    getWeatherData(city);
});

// Enter
cityInput.addEventListener("keyup", (e) => {

    if(e.key === "Enter"){

        const city = cityInput.value;

        if(!city) return;

        getWeatherData(city);
    }
});