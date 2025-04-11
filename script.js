// Create button and add it to the input bar
let button = document.createElement("button");
button.textContent = "Check";
button.className = "submit";
let inputbar = document.querySelector(".inputbar");
inputbar.appendChild(button);

const apiKey = "cd26f18e87b79fb7e2f85eadb0b5089b"; // (Temporary! Hide later)
const city = "location"; // Replace with user input
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
console.log(apiUrl);

let displayweather = document.querySelector(".displayweather")

button.addEventListener("click", function(){
    let locationinput = document.getElementById("location").value
    
    if(!locationinput){
        alert("please choose a location")
    }
    fetchweatherdata(locationinput)
    })

    async function fetchweatherdata(location) {
        let showweather = document.querySelector(".showweather");
        showweather.innerHTML = "<p>Loading weather data...</p>";
        
        // Create the API URL with the location from user input
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`;
        
        try {
            // Make the API call
            const response = await fetch(apiUrl);
            
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`Weather data not found (${response.status})`);
            }
            
            // Parse the JSON response
            const weatherData = await response.json();
            console.log("Weather data:", weatherData);
            
            // Display the data in the UI
            displayWeatherData(weatherData);
            
        } catch (error) {
            console.error("Error fetching weather data:", error);
            showweather.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }
    function displayWeatherData(data) {
        // Get reference to the display container
        let showweather = document.querySelector(".showweather");
        
        // Convert temperature from Kelvin to Celsius if needed
        const tempCelsius = Math.round(data.main.temp);
        
        // Format the weather data as HTML
        const weatherHTML = `
            <div class="back">
                <button class="backbtn">
                    <img src="back.svg" alt="">
                </button>
                <p>Weather for ${data.name}, ${data.sys.country}</p>
            </div>
            <div class="line"></div>
            <div class="weather-details">
                <h2>${tempCelsius}°C</h2>
                <p>Condition: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} m/s</p>
                <p>Pressure: ${data.main.pressure} hPa</p>
            </div>
        `;
        
        // Update the UI with the weather information
        showweather.innerHTML = weatherHTML;
        
        // Add functionality to the back button
        const backBtn = showweather.querySelector(".backbtn");
        backBtn.addEventListener("click", function() {
            // Reset to initial state or handle back action
            document.getElementById("location").value = "";
            showweather.innerHTML = `
                <div class="back">
                    <button class="backbtn">
                        <img src="back.svg" alt="">
                    </button>
                    <p>Change Location</p>
                </div>
                <div class="line"></div>
            `;
        });
    }
