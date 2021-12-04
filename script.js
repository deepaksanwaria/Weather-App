const input = document.querySelector('input'),
    search = document.getElementById('search_btn'),
    infoTxt = document.getElementById('message'),
    locationBtn = document.getElementById('locationBtn'),
    temp_field = document.getElementById('temp'),
    sunrise_field = document.getElementById('sunrise'),
    sunset_field = document.getElementById('sunset'),
    city_name = document.getElementById('city_name'),
    country_name = document.getElementById('country_name'),
    description_field = document.getElementById('description'),
    real_feel_value = document.getElementById('real_feel_value'),
    humidity_value = document.getElementById('humidity_value'),
    weather_image = document.getElementById('weather_img');
let api;
var appid = "a68ca9034e611cf04b44696858a0f726";
// Fetching Cookie Value and storing the value to city_cookie
let city_cookie = "";
try {
    // document.cookie = "city=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    city_cookie = getCookie('weather_city');
} catch (error) {
    console.error(error);
}

// Calling the requestApi() function if enter key is pressed while typing in the input field 
input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        requestApi(input.value);
    }
});

// Calling the getLocation() function if search button is clicked
search.addEventListener("click", () => {
    if (input.value != "") {
        requestApi(input.value);
    }
});

// fetching the location when the location button is clicked
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        infoTxt.innerText = 'Locating Your Location';
        infoTxt.classList.add("valid");
    } else {
        infoTxt.innerText = 'Unsupported Browser';
        infoTxt.classList.add("invalid");
    }
});


// Setting the api 
function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appid}`;
    fetchData();
}

//  if the location button is clicked, OnSuccess function is called if location is found
function onSuccess(position) {
    const { latitude, longitude } = position.coords; // getting the latitude and longitude
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${appid}`; // setting the api
    fetchData(); // calling the fetchData() function
}

// if the location button is clicked, OnError function is called if location is not found
function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.replace("valid", "invalid");
}

// fetching the data from the api and storing it in the json variable
function fetchData() {
    infoTxt.innerText = "Fetching weather details...";
    infoTxt.classList.add("valid");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("valid", "invalid");
    });
}

// Assigning the fetched values to the fields
function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.replace("valid", "invalid");
        infoTxt.innerText = `${input.value} isn't a valid city name`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const sunrise = unixToDate(info.sys.sunrise);
        const sunset = unixToDate(info.sys.sunset);
        const { description, id, icon } = info.weather[0];
        const { temp, feels_like, humidity } = info.main;
        const len = icon.length;
        const day_night = icon.charAt(len - 1);
        if (id == 800) {
            if (day_night == "d") {
                weather_image.src = "Images/clear.png";
                weather_image.height = "140";
                weather_image.width = "150";
            } else {
                weather_image.src = "Images/moon.png";
                weather_image.height = "140";
                weather_image.width = "140";
            }
        } else if (id >= 200 && id <= 232) {
            weather_image.src = "Images/thunderstorm.png";
            weather_image.height = "140";
            weather_image.width = "140";
        } else if (id >= 600 && id <= 622) {
            weather_image.src = "Images/snow.png";
            weather_image.height = "140";
            weather_image.width = "140";
        } else if (id >= 701 && id <= 781) {
            if (day_night == "d") {
                weather_image.src = "Images/haze.png";
                weather_image.height = "140";
                weather_image.width = "140";
            } else {
                weather_image.src = "Images/haze-night.png";
                weather_image.height = "140";
                weather_image.width = "140";
            }
        } else if (id == 801) {
            if (day_night == "d") {
                weather_image.src = "Images/cloudy-weather.png";
                weather_image.height = "140";
                weather_image.width = "140";
            } else {
                weather_image.src = "Images/moon-cloud.png";
                weather_image.height = "140";
                weather_image.width = "140";
            }
        } else if (id >= 802 && id <= 804) {
            weather_image.src = "Images/clouds.png";
            weather_image.height = "140";
            weather_image.width = "140";
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            weather_image.src = "Images/rain.png";
            weather_image.height = "140";
            weather_image.width = "140";
        }

        console.log(city, country, description, temp, feels_like, humidity, sunrise, sunset);
        city_name.innerText = city;
        country_name.innerText = country;
        description_field.innerText = description;
        temp_field.innerText = Math.round(temp);
        sunrise_field.innerText = sunrise;
        sunset_field.innerText = sunset;
        real_feel_value.innerText = Math.round(feels_like);
        humidity_value.innerText = humidity;
        infoTxt.classList.remove("valid", "invalid");
        infoTxt.innerText = "Message....";
        input.value = "";
        setCookie(city);
    }
}

// Converting the unix time to time stamp
function unixToDate(unix) {
    const date = new Date(unix * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    if (hours < 10) {
        return `0${hours}:${date.getMinutes()}`;
    } else {
        return `${hours}:${minutes.substr(-2)}`;
    }
}

// function to set the cookie value
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// function to set the cookie value
function setCookie(cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "weather_city=" + cvalue + ";" + expires + ";path=/";
}



console.log(city_cookie); // prints the cookie value to the console.
/* 
If the cookie value is set then fetching the details for the cookie city value or else fetching the details for the New Delhi city.
It is executed only when the page is loaded.
*/
if (city_cookie.length > 0) {
    requestApi(city_cookie);
} else {
    requestApi('New Delhi');
}