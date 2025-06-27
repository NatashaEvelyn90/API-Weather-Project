const yourLocationWeather = document.getElementById("weatherUpdate");

//* Background Music
// #region
const goodMorning = document.getElementById("morningTheme");
const secretOne = document.getElementById("secretSongOne");
const goodAfternoon = document.getElementById("afternoonTheme");
const secretTwo = document.getElementById("secretSongTwo");
const goodEvening = document.getElementById("eveningTheme");
// #endregion

const bottomFoot = document.getElementById("footEr")


function backgroundTime() {
    const currentTime = new Date().getHours();

    //! Images
    // #region 
    //? Morning images
    const sunnyImage = document.querySelector("#dayCycle");
    const sunnyImageTwo = document.querySelector("#dayCycleTwo");

    //? Heat Images 
    const heatOne = document.querySelector("#datHeat");
    const heatTwo = document.querySelector("#datHeatTwo");
    const heatThree = document.querySelector("#datHeatThree");
    const heatFour = document.querySelector("#datHeatFour");

    //? Afternoon Images
    const earthImage = document.querySelector("#afternoonCycle");
    const earthImageTwo = document.querySelector("#afternoonCycleTwo");

    //? Arms Dealer
    const dealer = document.querySelector("#persona");
    const dealerTwo = document.querySelector("#personaTwo");
    const dealerThree = document.querySelector("#personaThree");

    //? Evening Images
    const nightImage = document.querySelector("#nightCycle");
    const nightImageTwo = document.querySelector("#nightCycleTwo");

    let backgroundImageURL;
  // #endregion

    
    if (currentTime >= 6 && currentTime < 12) {
      backgroundImageURL = sunnyImage; //? Daytime image
      sunnyImage.removeAttribute("hidden");
      sunnyImageTwo.removeAttribute("hidden");
      goodMorning.play();

    } else if(currentTime >= 12 && currentTime < 14) {
      backgroundImageURL = heatOne; //? Secret Song One
      heatOne.removeAttribute("hidden");
      heatTwo.removeAttribute("hidden");
      heatThree.removeAttribute("hidden");
      heatFour.removeAttribute("hidden");
      secretOne.play();

    }else if(currentTime >= 14 && currentTime < 18) {
      backgroundImageURL = earthImage; //? Afternoon Image
      earthImage.removeAttribute("hidden");
      earthImageTwo.removeAttribute("hidden");
      goodAfternoon.play();

    } else if(currentTime >= 18 && currentTime < 19) {
      backgroundImageURL = dealer; //? Secret Song Two
      dealer.removeAttribute("hidden");
      dealerTwo.removeAttribute("hidden");
      dealerThree.removeAttribute("hidden");
      secretTwo.play();

    }else {
        backgroundImageURL = nightImage; //? Nighttime image
        nightImage.removeAttribute("hidden");
        nightImageTwo.removeAttribute("hidden");
        goodEvening.play();
    }

}

yourLocationWeather.addEventListener("click", getWeather);
function getWeather() {
    backgroundTime();
    
    const zip = document.getElementById('zipCode').value;
    const geoUrl = `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=USA&format=json`;

    fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        if (!data.length) throw new Error('ZIP code not found');
        const lat = data[0].lat;
        const lon = data[0].lon;
        return fetch(`https://api.weather.gov/points/${lat},${lon}`);
      })

      .then(response => response.json())
      .then(data => {
        const forecastUrl = data.properties.forecast;
        const city = data.properties.relativeLocation.properties.city;
        const state = data.properties.relativeLocation.properties.state;

        document.getElementById('zipLocation').innerHTML = `<h2>Weather Forecast for: <strong class="strongOne">${city}, ${state}<strong></h2>`;
        return fetch(forecastUrl);
      })

      .then(response => response.json())
      .then(data => {
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = '';
        const periods = data.properties.periods;

        periods.forEach(period => {
          const day = document.createElement('div');
          day.innerHTML = `
            <h3>${period.name}</h3>
            <img src="${period.icon}" alt="${period.shortForecast}">
            <p><strong class="strongTemperature">Temperature:</strong> <span class="strongOne">${period.temperature}°${period.temperatureUnit}</span></p>
            <p><strong class="strongPrediction">Predicted Forecast:</strong> <span class="strongOne">${period.shortForecast}</span></p>
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