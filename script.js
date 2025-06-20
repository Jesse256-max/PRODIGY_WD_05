const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

function displayWeather(data) {
  const weatherBox = document.getElementById("weatherInfo");
  if (data.cod === 200) {
    weatherBox.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
    `;
  } else {
    weatherBox.innerHTML = `<p>City not found. Please try again.</p>`;
  }
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (city.trim() !== "") {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => displayWeather(data))
      .catch(error => {
        document.getElementById("weatherInfo").innerHTML = "<p>Error fetching data.</p>";
      });
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data));
    }, () => {
      document.getElementById("weatherInfo").innerHTML = "<p>Location access denied.</p>";
    });
  } else {
    document.getElementById("weatherInfo").innerHTML = "<p>Geolocation not supported by your browser.</p>";
  }
}
