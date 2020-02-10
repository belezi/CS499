var baseUrl = 'https://api.darksky.net/forecast/';
var apiKey = "f2aadc2fca4bf3e2834c9425e52b54bb"; // darksky.net api key
var latitude = "45.536031"; // Showing Montreal. This will be the default city until the user gives permission for geolocation.
var longitude = "-73.5906905";
var currentCity = "Montreal";
var selectedLang = "en"; // too many options.  check here https://darksky.net/dev/docs/forecast
var selectedUnits = "si"; // auto, ca, uk2, us, si
var timeFormat = "12Hr";
var currentShownHrs = [];

var unitLabels = {
    "si" : {
        degreeSymbol : "C",
        rainPrecUnit : "mm",
        snowPrecUnit : "cm",
        windUnit : "km/h"
    },
    "us" : {
        degreeSymbol : "F",
        rainPrecUnit : "In",
        snowPrecUnit : "In",
        windUnit : "m/h"
    }
}
var langLabels = {
    "en" : {
        maxLabel : "Max",
        minLabel : "Min",
        rhLabel : "Rh",
        accLabel : "Acc",
        probLabel : "Prob",
        todayLabel : "Today",
        windLabel : "Wind",
        apparentTempLabel : "Feeling",
        week : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        month : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    "fr" : {
        maxLabel : "Max",
        minLabel : "Le Min",
        rhLabel : "Hum",
        accLabel : "Acc",
        probLabel : "Prob",
        todayLabel : "Aujourd'hui",
        windLabel : "Vent",
        apparentTempLabel : "Sentiment",
        week : ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        month : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    },
    "de" : {
        maxLabel : "Max",
        minLabel : "Min",
        rhLabel : "Feuch",
        accLabel : "Akk",
        probLabel : "Wahr",
        todayLabel : "Heute",
        windLabel : "Wind",
        apparentTempLabel : "Gefühl",
        week : ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        month : ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    },
    "ko" : {
        maxLabel : "맥스",
        minLabel : "최소",
        rhLabel : "습기",
        accLabel : "축적",
        probLabel : "개연성",
        todayLabel : "오늘",
        windLabel : "바람",
        apparentTempLabel : "감각",
        week : ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        month : ["일월", "이월", "삼월", "사월", "오월", "유월", "칠월", "팔월", "구월", "시월", "십일월", "십이월"]
    }
}

//Set Units
var degreeSymbol = unitLabels[selectedUnits].degreeSymbol; // C or F
var rainPrecUnit = unitLabels[selectedUnits].rainPrecUnit;
var snowPrecUnit = unitLabels[selectedUnits].snowPrecUnit;
var windUnit = unitLabels[selectedUnits].windUnit;

// Set Language for labels.
var todayLabel = langLabels[selectedLang].todayLabel;
var windLabel = langLabels[selectedLang].windLabel;
var apparentTempLabel = langLabels[selectedLang].apparentTempLabel;
var week = langLabels[selectedLang].week;
var month = langLabels[selectedLang].month;
var maxLabel = langLabels[selectedLang].maxLabel;
var minLabel = langLabels[selectedLang].minLabel;
var windLabel = langLabels[selectedLang].windLabel;
var rhLabel = langLabels[selectedLang].rhLabel;
var accLabel = langLabels[selectedLang].accLabel;
var probLabel = langLabels[selectedLang].probLabel;

var forecastNbOfDays = 8; // 0 to 8
var hourlyNbOfHours = 12; // 0-49
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

var url = baseUrl + apiKey + '/' + latitude + ',' + longitude + '?lang=' + selectedLang + '&exclude=minutely&units=' + selectedUnits;
