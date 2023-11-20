const weather = {
   apiKey: "dbf3b974538de47f4020d1056fd13e24",

   // Fetch weather data from the OpenWeatherMap API
   fetchWeather: function (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
         .then((response) => {
            if (!response.ok) {
               // Handle the case where no weather data is found
               alert("No weather found.");
               throw new Error("No weather found.");
            }
            return response.json();
         })
         .then((data) => this.displayWeather(data))
         .catch((error) => console.error("Error fetching weather:", error));
   },

   // Display weather data on the webpage
   displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      // Update HTML elements with weather data
      document.querySelector(".city").innerText = `Weather in ${name}`;
      document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".description").innerHTML = description;
      document.querySelector(".temp").innerHTML = `${temp}°C`;
      document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
      document.querySelector(".wind").innerHTML = `Wind speed: ${speed} km/h`;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = `url(https://source.unsplash.com/random/1920x1080/?wallpaper,landscape${name})`;
   },

   // Initiate a weather search based on user input
   search: function () {
      this.fetchWeather(document.querySelector(".search").value);
    },
} 

// Event listeners for search button and Enter key
document.querySelector(".search-bar button")?.addEventListener("click", () => {
   weather.search();
 });
 
 document.querySelector(".search").addEventListener("keyup", (event) => {
   if (event.key === "Enter") {
     weather.search();
   }
});

// Example initial fetch (Denver)
weather.fetchWeather("Denver");
