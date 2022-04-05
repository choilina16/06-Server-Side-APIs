var cityEl = $('.city');
var currentTempEl = $('.current-temp');
var humidityEl = $('.humidity');
var windSpeedEl = $('.wind-speed');
var weatherIconEl = $('.weather-icon');


var APIKey = '66d73560f989570188d6abc55a3ce4cd';

function fetchWeather () {
    var city = $('.city-name').val();
    var queryCurrentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + APIKey;
    // .then is already calling the function
    fetch(queryCurrentWeatherURL)
        .then(function (response) {
            console.log(response);
            // passing through as readable format
            return response.json ();
        })
         // data represents output from json
        .then(function(data) {
            // console.log(data);

            // futureForecast();

            var cityName = data.name;
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var icon = data.weather[0];
            var longitude = data.coord.lon;
            var latitude = data.coord.lat;

            console.log(cityName);
            console.log(temperature);
            console.log(humidity);
            console.log(windSpeed);
            console.log(icon);
            console.log(longitude);
            console.log(latitude);   

            cityEl.innerText = cityName;
            currentTempEl.innerText = temperature;
            humidityEl.innerText = humidity;
            windSpeedEl.innerText = windSpeed;
            weatherIconEl.src='http://openweathermap.org/img/wn/' + icon + '@2x.png';
        
            console.log(cityEl, currentTempEl, humidityEl, windSpeedEl);

        })
}

function futureForecast () {

    // current.uvi

    var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude={part}&appid=' + APIKey; 

    // fetchWeather();

    fetch(queryOneCallURL)
        .then(function (response) {
            console.log(response);
            return response.json ();
        })
        .then(function(data) {
            console.log(data);
        })
}

// function fetchWeather
var saveButtonEl = $('.search-button');
saveButtonEl.on('click', futureForecast);






