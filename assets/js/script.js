// Current date to be displayed
var today = moment();
$('.current-date').text(today.format('L'));

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
            console.log(data);

            var cityName = data.name;
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var icon = data.weather[0].icon;
            var longitude = data.coord.lon;
            var latitude = data.coord.lat;
            var currentForecast = [cityName, temperature, humidity, windSpeed, icon, longitude, latitude]

            console.log(currentForecast);

            document.querySelector('.city').innerText = cityName;
            document.querySelector('.current-temp').innerText = temperature + ' °F';
            document.querySelector('.humidity').innerText = humidity + ' %';
            document.querySelector('.wind-speed').innerText = windSpeed + ' mph';
            document.querySelector('.weather-icon').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

            fetchFutureForecast(currentForecast[5], currentForecast[6]);
        })    
}        

// https://api.openweathermap.org/data/2.5/onecall?lat=39.7392&lon=-104.9847&exclude=minutely,hourly&units=imperial&appid=66d73560f989570188d6abc55a3ce4cd

function fetchFutureForecast (longitude, latitude) {
    var queryOneCallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly&units=imperial&appid=' + APIKey; 

    fetch(queryOneCallURL)
        .then(function (response1) {
            console.log(response1)
            return response1.json ();
        })
        .then(function (data1) {
            console.log(data1)

            var UVIndex = data1.current.uvi;
            console.log(UVIndex);

            document.querySelector('.uv').innerText = UVIndex;

            // var futureTemp = data1.daily[i].temp.day;
            // var futureHumidity = data1.daily[i].humidity;
            // var futureWindSpeed = data1.daily[i].wind_speed;
            // var futureIcon = data1.daily[i].weather[0].icon;

            // console.log(futureTemp);
            // console.log(futureHumidity);
            // console.log(futureWindSpeed); 
            // console.log(futureIcon);

            // for (var i = 1; i < 6; i++) {


        })
}

// function fetchWeather
var saveButtonEl = $('.search-button');
saveButtonEl.on('click', fetchWeather);