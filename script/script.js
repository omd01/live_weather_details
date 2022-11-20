
let temperature = document.getElementById("temperature");
let city = document.getElementById("city");
let wind = document.getElementById("wind");
let min_max_temp = document.getElementById("min_max_temp");
let weathercon = document.getElementById("status");


const loadData = () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((loc) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&units=metric&appid=34305f1a36d2ad042b8c9c4e0b723d7f`)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                    else {
                        return Promise.reject(response);
                    }

                }).then((data) => {
                    temperature.innerHTML = data.main.temp;
                    city.innerHTML = data.name + " , " + data.sys.country;
                    wind.innerHTML = data.wind.speed;
                    min_max_temp.innerHTML = `Min: ${data.main.temp_min}&deg;C | Max: ${data.main.temp_max}&deg;C`;

                    const tempStatus = data.weather[0].main;
                    if (tempStatus == "Sunny") {
                        weathercon.innerHTML = "<p class='status-text'><i class='fa-solid fa-sun' style='color: #eccc68;'></i>Sunny</p>"
                    }
                    else if (tempStatus == "Smoke") {
                        weathercon.innerHTML = "<p class='status-text'><i class='fa-solid fa-cloud-fog' style='color: #f1f2f6;'></i>Smoke</p>"

                    }
                    else if (tempStatus == "Clouds") {
                        weathercon.innerHTML = "<p class='status-text'><i class='fa-solid fa-cloud' style='color: #f1f2f6;'></i>Cloudy</p>"
                    }
                    else if (tempStatus == "Rainy") {
                        weathercon.innerHTML = "<p class='status-text'><i class='fa-solid fa-cloud-rain' style='color: #a4b0be;'></i>Rainy</p>"
                    }
                    else if (tempStatus == "Clear") {
                        weathercon.innerHTML = "<p class='status-text'><i class='fa-solid fa-sun' style='color: #eccc68;'></i>Clear</p>"
                    }
                    else {
                        weathercon.innerHTML = "<p class='status-text'><i class='fa-solid fa-cloud' style='color: #f1f2f6;'></i></i>Cloudy</p>"
                    }


                }).catch((err) => {
                    console.warn('Something went wrong.', err);
                })

        },
            (err) => {
                console.log(err);
            });

    } else {
        alert("Geolocation is not supported by this browser.");
    }

}




