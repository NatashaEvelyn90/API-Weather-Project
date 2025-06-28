const yourLocationWeather = document.getElementById("weatherUpdate");
const bottomFoot = document.getElementById("footEr");
const information = document.getElementById("disclaimerInfo")

//* Background Music
// #region
const starrySong = document.getElementById("sonicStars");
const goodMorning = document.getElementById("morningTheme");
const softMuseum = document.getElementById("softMuseumSong");
const secretOne = document.getElementById("secretSongOne");
const goodAfternoon = document.getElementById("afternoonTheme");
const gratia = document.getElementById("fifteenSong");
const puzzles = document.getElementById("tetrisTheme");
const secretTwo = document.getElementById("secretSongTwo");
const rizSong = document.getElementById("thatSongstress");
const goodEvening = document.getElementById("eveningTheme");

const pauseBtn = document.getElementById("pauseMusic")
const playingSongs = document.getElementById("songChoices")

pauseBtn.addEventListener("click", function () {
    const audioElements = document.querySelectorAll(".musicPlayer audio");
    let isPaused = true;

    audioElements.forEach(audio => {
      if (!audio.paused) {
        audio.pause();
        isPaused = true;
      } else if (audio.currentTime > 0 && audio.currentTime < audio.duration) {
        audio.play();
        isPaused = false;
      }
    });

    pauseBtn.textContent = isPaused ? "Play" : "Pause";
  });
// #endregion

//TODO This starts the time section
function backgroundTime() {
  const currentTime = new Date().getHours();
  //! Images
  // #region 
  const milkyWay = document.querySelector("#ourGalaxy");

  //? Starlight Images
  const sonicOne = document.querySelector("#sonicStuff");
  const sonicTwo = document.querySelector("#sonicStuffTwo");
  const sonicThree = document.querySelector("#sonicStuffThree");

  //? Morning images
  const sunnyImage = document.querySelector("#dayCycle");
  const sunnyImageTwo = document.querySelector("#dayCycleTwo");

  //? Soft Museum Images
  const nights = document.querySelector("#nightsBackground");
  const nightsTwo = document.querySelector("#frontSparkles");
  const nightsThree = document.querySelector("#frontSparklesTwo");
  const nightsFour = document.querySelector("#nightsBackgroundTwo");

  //? Heat Images 
  const heatOne = document.querySelector("#datHeat");
  const heatTwo = document.querySelector("#datHeatTwo");
  const heatThree = document.querySelector("#datHeatThree");

  //? Afternoon Images
  const earthImage = document.querySelector("#afternoonCycle");
  const earthImageTwo = document.querySelector("#afternoonCycleTwo");

  //? Gratia Images
  const noctis = document.querySelector("#fifteen");
  const noctisTwo = document.querySelector("#ringOne");
  const noctisThree = document.querySelector("#ringTwo");
  
  //! Tetris Images 
  const blockOne = document.querySelector("#shapes")  
  const blockTwo = document.querySelector("#shapesOne")
  const blockThree = document.querySelector("#shapesTwo")
  const blockFour = document.querySelector("#shapesThree")
  const blockFive = document.querySelector("#shapesFour")
  const blockSix = document.querySelector("#shapesFive")
  const blockSeven = document.querySelector("#shapesSix")  

  //? Arms Dealer
  const dealer = document.querySelector("#persona");
  const dealerTwo = document.querySelector("#personaTwo");
  const dealerThree = document.querySelector("#personaThree");
  const dealerFour = document.querySelector("#personaFour");

  //? Risette
  const risette = document.querySelector("#personaBackground");
  const risetteTwo = document.querySelector("#songstress");
  const risetteThree = document.querySelector("#songstressTwo");
  const risetteFour = document.querySelector("#personaBackgroundTwo");

  //? Evening Images
  const nightImage = document.querySelector("#nightCycle");
  const nightImageTwo = document.querySelector("#nightCycleTwo");

  let backgroundImageURL;
// #endregion
  
  //! Current Time Schedule 
  // #region
  if (currentTime >= 5 && currentTime < 6) {
    backgroundImageURL = sonicOne //? Starlight
    sonicOne.removeAttribute("hidden");
    sonicTwo.removeAttribute("hidden");
    sonicThree.removeAttribute("hidden");
    starrySong.play();

  }else if(currentTime >= 6 && currentTime < 11) {
    backgroundImageURL = sunnyImage; //? Time's Scar (Morning)
    sunnyImage.removeAttribute("hidden");
    sunnyImageTwo.removeAttribute("hidden");
    goodMorning.play();

  }else if(currentTime >= 11 && currentTime < 13) {
    backgroundImageURL = nights; //? Soft Museum
    nights.removeAttribute("hidden");
    nightsTwo.removeAttribute("hidden");
    nightsThree.removeAttribute("hidden");
    nightsFour.removeAttribute("hidden");
    softMuseum.play();

  }else if(currentTime >= 13 && currentTime < 15) {
    backgroundImageURL = heatOne; //? HEAT is on!
    heatOne.removeAttribute("hidden");
    heatTwo.removeAttribute("hidden");
    heatThree.removeAttribute("hidden");
    secretOne.play();

  }else if(currentTime >= 15 && currentTime < 17) {
    backgroundImageURL = earthImage; //? Yaschas Massif (Afternoon)
    earthImage.removeAttribute("hidden");
    earthImageTwo.removeAttribute("hidden");
    goodAfternoon.play();

  } else if(currentTime >= 17 && currentTime < 19) {
    backgroundImageURL = noctis; //? Gratia Mundi
    noctis.removeAttribute("hidden");
    noctisTwo.removeAttribute("hidden");
    noctisThree.removeAttribute("hidden");
    milkyWay.style.visibility = 'hidden';
    gratia.play();

  }else if(currentTime >= 19 && currentTime < 20) {
    blockOne.removeAttribute("hidden");
    blockTwo.removeAttribute("hidden");
    blockThree.removeAttribute("hidden");
    blockFour.removeAttribute("hidden");
    blockFive.removeAttribute("hidden");
    blockSix.removeAttribute("hidden");
    blockSeven.removeAttribute("hidden");
    milkyWay.style.visibility = 'hidden';
    puzzles.play();

  }else if(currentTime >= 20 && currentTime < 21) {
    backgroundImageURL = dealer; //? Weapon's Dealer
    dealer.removeAttribute("hidden");
    dealerTwo.removeAttribute("hidden");
    dealerThree.removeAttribute("hidden");
    dealerFour.removeAttribute("hidden");
    milkyWay.style.visibility = 'hidden';
    secretTwo.play();

  }else if(currentTime >= 21 && currentTime < 22) {
    backgroundImageURL = risette; //? Risette 
    risette.removeAttribute("hidden");
    risetteTwo.removeAttribute("hidden");
    risetteThree.removeAttribute("hidden");
    risetteFour.removeAttribute("hidden");
    milkyWay.style.visibility = 'hidden';
    rizSong.play();

  }else {
      backgroundImageURL = nightImage; //? Destiny Island (Evening)
      nightImage.removeAttribute("hidden");
      nightImageTwo.removeAttribute("hidden");
      goodEvening.play();
  }
  // #endregion
  
}

//TODO This is the API weather section 
yourLocationWeather.addEventListener("click", getWeather);
function getWeather() {
  backgroundTime();
  bottomFoot.style.justifyContent = 'center';
  information.style.display ='none';
  
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