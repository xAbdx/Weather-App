// function weatherBalloon(cityID) {
//     fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=052006c5a2739807262fdf2140e52014')
//         .then(function (resp) { return resp.json() }) // Convert data to json
//         .then(function (data) {
//             drawWeather(data);
//         })
// }

// window.onload = function () {
//     weatherBalloon(285066);  //6167865 //285066
// }

// function drawWeather(d) {
//     var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
//     var description = d.weather[0].description;

//     document.getElementById('description').innerHTML = description;
//     document.getElementById('temp').innerHTML = celcius + '&deg;';
//     document.getElementById('location').innerHTML = d.name;

    // if (description.indexOf('rain') > 0) {
    //     document.body.className = 'rainy';
    // } else if (description.indexOf('cloud') > 0) {
    //     document.body.className = 'cloudy';
    // } else if (description.indexOf('sunny') > 0) {
    //     document.body.className = 'sunny';
    // }
// }


const api = {
    key: "052006c5a2739807262fdf2140e52014",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('#searchBox');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
        // console.log(searchBox.value); //for testing
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('#location');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('#date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('#temp');
    temp.innerText = `${Math.round(weather.main.temp)}°C`;

    let description = document.querySelector('#description');
    description.innerText = weather.weather[0].description;

    // if (description.indexOf('rain') > 0) {
    //     document.body.className = 'rainy';
    // } else if (description.indexOf('cloud') > 0) {
    //     document.body.className = 'cloudy';
    // } else if (description.indexOf('sunny') > 0) {
    //     document.body.className = 'sunny';
    // }
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`
}