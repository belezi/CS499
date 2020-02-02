var apiKey = "f2aadc2fca4bf3e2834c9425e52b54bb"; // darksky.net api key
var latitude = "45.536031"; // Showing Montreal. This will be the default city until the user gives permission for geolocation.
var longitude = "-73.5906905";
var currentCity = "Montreal";
var lang = "en"; // too many options.  check here https://darksky.net/dev/docs/forecast
var units = "si"; // auto, ca, uk2, us, si
var degreeSymbol = "C"; // C or F
var rainPrecUnit = "mm";
var snowPrecUnit = "cm";
var windUnit = "km/h"
var forecastNbOfDays = 8; // 0 to 8
var hourlyNbOfHours = 5; // 0-49
var theme = "blue"; // "blue", "black", "white"

var showScrollingAlerts = true;
var showCurrentWeather = true;
var showCurrentIcon = true;
var showCurrentSummary = true;
var showCurrentWind = true;
var showCurrentWindBearing = true;
var showCurrentHumidity = true;
var showCurrentDate = true;
var showCurrentTime = true;

var showHourlyIcon = true;
var showHourlyWind = true;
var showHourlyWindBearing = true;
var showHourlyAccumulation = true;
var showHourlyHumidity = true;
var showHourlyProbability = true;

var showForecastIcon = true;
var showForecastSummary = true;
var showForecastMinTemp = true;
var showForecastWind = true;
var showForecastWindBearing = true;
var showForecastHumidity = true;
var showForecastAccumulation = true;
var showForecastProbability = true;


var showDarkSkyLink = false; // set to true if you have a free darksky api key.

var debugging = false; // will allow showing forecast for past days.  Usefull when playing with sample data

// Set for your language
// English
var todayLabel = "Today";
var windLabel = "wind";
var apparentTempLabel = "feeling";
var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// French
//var todayLabel = "Aujourd'hui";
//var windLabel = "vent";
//var apparentTempLabel = "ressentie";
//var week = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
//var month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

var url = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?lang=' + lang + '&exclude=minutely&units=' + units;
