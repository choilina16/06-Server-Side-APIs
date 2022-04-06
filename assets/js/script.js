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
        .then(function (response) {
            console.log(response)
            return response.json ();
        })
        .then(function (data) {
            console.log(data)

            var UVIndex = data.current.uvi;
            console.log(UVIndex);

            document.querySelector('.uv').innerText = UVIndex;

            for (var i = 1; i < 6; i++) {
                var futureDay = data.daily[i].dt;
                var futureTemp = data.daily[i].temp.day;
                var futureHumidity = data.daily[i].humidity;
                var futureWindSpeed = data.daily[i].wind_speed;
                var futureIcon = data.daily[i].weather[0].icon;

                var headerEl = document.createElement('h2');
                var imageEl = document.createElement('image');
                var ulEl = document.createElement('ul');
                var liEl = document.createElement('li');

                headerEl.innerHTML = 
                document.getElementById(day).appendChild();

                console.log(futureDay, futureTemp, futureHumidity, futureWindSpeed, futureIcon);




            }



        })
}

// function fetchWeather
var saveButtonEl = $('.search-button');
saveButtonEl.on('click', fetchWeather);