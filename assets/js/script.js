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

            // pulling out data from API
            var cityName = data.name;
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var icon = data.weather[0].icon;
            var longitude = data.coord.lon;
            var latitude = data.coord.lat;
            var currentForecast = [cityName, temperature, humidity, windSpeed, icon, longitude, latitude]

            console.log(currentForecast);

            // displaying to page 
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
            
            // getting the uv index for current weather
            document.querySelector('.uv').innerText = UVIndex;

            // for loop to get data out from each day
            for (var i = 1; i < 4; i++) {
                var futureDay = data.daily[i].dt;
                var futureTemp = data.daily[i].temp.day;
                var futureHumidity = data.daily[i].humidity;
                var futureWindSpeed = data.daily[i].wind_speed;
                var futureIcon = data.daily[i].weather[0].icon;

                console.log(futureDay, futureTemp, futureHumidity, futureWindSpeed, futureIcon);

                // var array = [futureDay, futureTemp, futureHumidity, futureWindSpeed, futureIcon];
                // console.log(array);

                // putting info from for loop to arrays so i can pass to next function
                var futureDayData = [futureDay];
                var futureTempData = [futureTemp]
                var futureHumidityData =[futureHumidity]
                var futureWindSpeedData = [futureWindSpeed]
                var futureIconData = [futureIcon]

                console.log(futureDayData, futureTempData, futureHumidityData, futureWindSpeedData, futureIconData);

            }
            // passing the values of these array to the next function
            displayFutureForcast(futureDayData, futureTempData, futureHumidityData, futureWindSpeedData, futureIconData);
        })
}

function displayFutureForcast (futureDayData, futureTempData, futureHumidityData, futureWindSpeedData, futureIconData) {

    // hard coding info from for loop to the page for day 1 --hey but one day is still condidered the future right? hehe
    document.querySelector('.future-date-1').innerText = futureDayData[0];
    document.querySelector('.future-temp-1').innerText = futureTempData[0] + ' °F';
    document.querySelector('.future-humidity-1').innerText = futureHumidityData[0] + ' %';
    document.querySelector('.future-wind-speed-1').innerText = futureWindSpeedData[0] + ' mph';
    document.querySelector('.future-weather-icon-1').src = 'http://openweathermap.org/img/wn/' + futureIconData[0] + '@2x.png';

    // hard coding info from for loop to the page for day 2 -- DOES NOT WORK!!
    document.querySelector('.future-date-2').innerText = futureDayData[1];
    document.querySelector('.future-temp-2').innerText = futureTempData[1] + ' °F';
    document.querySelector('.future-humidity-2').innerText = futureHumidityData[1] + ' %';
    document.querySelector('.future-wind-speed-2').innerText = futureWindSpeedData[1] + ' mph';
    document.querySelector('.future-weather-icon-2').src = 'http://openweathermap.org/img/wn/' + futureIconData[1] + '@2x.png';

      // hard coding info from for loop to the page for day 3 -- DOES NOT WORK!!
    document.querySelector('.future-date-3').innerText = futureDayData[2];
    document.querySelector('.future-temp-3').innerText = futureTempData[2] + ' °F';
    document.querySelector('.future-humidity-3').innerText = futureHumidityData[2] + ' %';
    document.querySelector('.future-wind-speed-3').innerText = futureWindSpeedData[2] + ' mph';
    document.querySelector('.future-weather-icon-3').src = 'http://openweathermap.org/img/wn/' + futureIconData[2] + '@2x.png';
}

// function fetchWeather
var saveButtonEl = $('.search-button');
saveButtonEl.on('click', fetchWeather);

// saving user input into local storage 
var city = $('.city-name').val();
localStorage.setItem("cityInput", city);

function renderSearchHistory () {
    var seachHistory = localStorage.getItem("cityInput");

    

}
