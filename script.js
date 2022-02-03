const locationInputEl = document.getElementById("locationInput");
const button = document.getElementById("submit");
var page = 0;

// var stateI = "CA";
var Today = moment().format("YYYY-MM-DD");
var dateI = Today;
var categoryI = "";
var EventAPIKey = "8vWG87wRwlREjTnlTeKlyotzDgBt6A0G";

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
  // .... ajax call to get the weather
}

function renderWeather(weather) {}
function renderEvents(events) {}

function handleSearchSubmit(event) {
  debugger;
  event.preventDefault();
  var location = locationInputEl.value.trim();

  getEventsByLocation(location).then(function (events) {
    debugger;
    getWeatherByLocation(location).then(function (weather) {
      renderWeather(weather);
      renderEvents(events);
    });
  });
}

function getCurrentEvents(input) {
  console.log("working");
}

//   fetch(
//     `https://app.ticketmaster.com/discovery/v2/events.json?=apikey=8vWG87wRwlREjTnlTeKlyotzDgBt6A0G`
//   ).then(function (response) {
//     return response.json();
//     console.log(data);
//   });
//   //  .then(function (data) {
//   //  / console.log(data);
//   // });

// Event listener for search location button "submit"
button.addEventListener("click", handleSearchSubmit);
