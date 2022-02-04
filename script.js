const locationInputEl = document.getElementById("locationInput");
const button = document.getElementById("submit");
let currentWeatherEl = document.getElementById("current");

var page = 0;

// var stateI = "CA";
var Today = moment().format("YYYY-MM-DD");
var dateI = Today;
var categoryI = "";
var EventAPIKey = "8vWG87wRwlREjTnlTeKlyotzDgBt6A0G";
var myKey = "988fbbe10b9a8419e74f5e6d95338e7c";

// const myKey = "8vWG87wRwlREjTnlTeKlyotzDgBt6A0G";

// $.ajax({
//   type: "GET",
//   url:
//     "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" +
//     EventAPIKey +
//     "&sort=date,asc" +
//     "&city=" +
//     cityI +
//     "&countryCode=GB" +
//     "&startedatetime=" +
//     dateI +
//     "&classificationName=" +
//     categoryI +
//     "&size=4&page=" +
//     page,
//   //   "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=8vWG87wRwlREjTnlTeKlyotzDgBt6A0G",
//   async: true,
//   dataType: "json",
//   success: function (json) {
//     console.log(json);
//     // Parse the response.
//     // Do other things.
//   },
//   error: function (xhr, status, err) {
//     // This time, we do not end up here!
//   },
// });

function getEventsByLocation(location) {
  return fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" +
      EventAPIKey +
      "&sort=date,asc" +
      "&city=" +
      location +
      "&countryCode=GB" +
      "&startedatetime=" +
      dateI +
      "&classificationName=" +
      categoryI +
      "&size=4"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data["_embedded"].events;
    });
  // ... ajax call from above would go here
}

function getWeatherByLocation(location) {
  return fetch(
    "https://api.openweathermap.org/data/2.5/oneCall?q=" +
      location +
      "lat=" +
      latitude +
      longitude +
      "&appid=" +
      myKey +
      "&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;
      getWeatherByLocation(latitude, longitude, input);
    });
}

// function renderWeather(weather) {}
// function renderEvents(events) {}

function handleSearchSubmit(event) {
  event.preventDefault();
  var location = locationInputEl.value.trim();

  getEventsByLocation(location).then(function (events) {
    console.log(events);
    getWeatherByLocation(location).then(function (weather) {
      console.log(weather);
      //   renderWeather(weather);
      //   renderEvents(events);
      // });
    });
  });
}

// Event listener for search location button "submit"
button.addEventListener("click", handleSearchSubmit);
