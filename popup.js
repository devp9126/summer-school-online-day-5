
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const button = document.getElementById('getWeatherBtn');
const resultDiv = document.getElementById('weatherResult');

button.addEventListener('click', () => {
  resultDiv.textContent = "Fetching weather...";
  if (!navigator.geolocation) {
    resultDiv.textContent = "Geolocation not supported.";
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const temp = data.main.temp;
        const city = data.name;
        const condition = data.weather[0].description;
        resultDiv.innerHTML = `<strong>${city}</strong><br>${temp}°C, ${condition}`;
      })
      .catch(() => {
        resultDiv.textContent = "Failed to fetch weather.";
      });
  }

  function error() {
    resultDiv.textContent = "Location access denied.";
  }
});
