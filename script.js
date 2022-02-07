// // Targeting html elements by id and class
const locationInputEl = document.getElementById("locationInput");
const button = document.getElementById("submit");
const eventContainer = document.querySelector(".event-container");
const weatherContainer = document.querySelector(".weather-container");
let video = document.querySelector("video");

// Storing Api Keys in const
const ticketMasterAPIKey = "8vWG87wRwlREjTnlTeKlyotzDgBt6A0G";
const openWeatherAPIKey = "988fbbe10b9a8419e74f5e6d95338e7c";

// Retreiving then storing live date from moment js to specify the events displayed to be for on the day. Using the variable 'Today' as a paremeter in teh feth call to get events data.
let Today = moment().format("YYYY-MM-DD");

// Save searched location into local storage

// Function to get events from ticket masters API, and then dynamically displaying data using cards.
function getEvents(e) {
  // Once the search button is used, the video will be replaced with event and weather content
  video.remove();

  // Clearing event data on page when a new location is searched
  eventContainer.innerHTML = "";
  fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" +
      ticketMasterAPIKey +
      "&sort=date,asc" +
      "&city=" +
      locationInputEl.value +
      "&countryCode=GB" +
      "&startedatetime=" +
      Today +
      "&size=4"
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      data["_embedded"].events.forEach((event) => {
        eventContainer.innerHTML += ` <div class="card is-outlined mt-4">
    
    <div class="tile is-parent">
    <div class="tile is-child box is outlined">
      <p class="title">${event.name};</p>
    </div>    
    <div class="tile is-ancestor">
<div class="tile is-parent">
<article class="tile is-child box">
  <p class="title">${event.dates.status.code}</p>
  <p class="subtitle">What is up?</p>
</article>
</div>    
<div class="tile is-parent">
<article class="tile is-child box">
<p class="title">${event.dates.start.localDate}</p>
<p class="subtitle">What is up?</p>
</article>
</div>
    </div>`;
      });
    });

  // Clearing weather data when new location is searched
  weatherContainer.innerHTML = "";

  // Fetching weather data
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${locationInputEl.value},gb&appid=${openWeatherAPIKey}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      // Storing weather data into an object
      let weatherObject = {};
      weatherObject.temp = data.main.temp;
      weatherObject.name = data.name;
      weatherObject.weather = data.weather[0].main;
      weatherObject.weatherDescription = data.weather[0].description;
      weatherObject.weatherIcon = data.weather[0].icon;
      // weather.push(weatherObject);

      // Displaying weather data using parameters on html in a card
      weatherContainer.innerHTML += ` <div class="card mt-4">
      <div class="tile is-parent">
    <article class="tile is-child box">
      <p class="title">${weatherObject.name}</p>
      <p class="subtitle">${weatherObject.temp}°C
      </p>
      <p class="subtitle">${weatherObject.weather}</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
    </article>
  </div>
 
     
  </div>`;
    });
}

// Submit button to run function to run fetch call
button.addEventListener("click", getEvents);
