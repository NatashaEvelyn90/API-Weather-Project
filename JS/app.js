const yourLocationWeather = document.getElementById("weatherUpdate");
const weatherTheme = document.getElementById("calmTheme");
const weatherPlaylist = [
    './MEDIA/Final Fantasy XV OST- Gratia Mundi.mp3',
    './MEDIA/32_Destiny_F.mp3'
];


yourLocationWeather.addEventListener("click", getWeather);
function getWeather() {
    let currentTrack = 0;
    weatherTheme.src = weatherPlaylist[currentTrack];
    weatherTheme.play();

   weatherTheme.onended = () => {
    currentTrack++;
    if (currentTrack >= weatherPlaylist.length) {
        currentTrack = 0;
    }
      weatherTheme.src = weatherPlaylist[currentTrack];
      weatherTheme.play();
  };
    
    const zip = document.getElementById('zipCode').value;
    const geoUrl = `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=USA&format=json`;

    fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        if (!data.length) throw new Error('ZIP code not found');
        const lat = data[0].lat;
        const lon = data[0].lon;

        // Now use the NWS points API
        return fetch(`https://api.weather.gov/points/${lat},${lon}`);
      })
      .then(response => response.json())
      .then(data => {
        const forecastUrl = data.properties.forecast;
        const city = data.properties.relativeLocation.properties.city;
        const state = data.properties.relativeLocation.properties.state;

        document.getElementById('zipLocation').innerHTML = `<h2>Weather Forecast for ${city}, ${state}</h2>`;

        return fetch(forecastUrl);
      })
      .then(response => response.json())
      .then(data => {
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = ''; // Clear previous
        const periods = data.properties.periods;

        periods.forEach(period => {
          const day = document.createElement('div');
          day.innerHTML = `
            <h3>${period.name}</h3>
            <p>${period.temperature}°${period.temperatureUnit}</p>
            <p>${period.shortForecast}</p>
            <img src="${period.icon}" alt="${period.shortForecast}">
          `;
          forecastDiv.appendChild(day);
        });
      })
      .catch(error => {
        document.getElementById('zipLocation').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        document.getElementById('forecast').innerHTML = '';
        console.error(error);
      });
    }     