var hasAlerts;

function initialize()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        $("#currentSummary").html("Geolocation is not supported by this browser. Showing Default City");
    }
    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        url = baseUrl + apiKey + '/' + latitude + ',' + longitude + '?lang=' + selectedLang + '&exclude=minutely&units=' + selectedUnits;
        getForecast()
        console.log(latitude);

        codeLatLng(latitude, longitude);
        showDateTime();
    }
    

    $('#theme').attr('href', 'theme/' + theme + '.css');
	hideUnwantedData();
	$("#apparentTempLabel").text(apparentTempLabel);
	$("#windLabel").text(windLabel);
	showDateTime();
	getForecast();
	
	var t = setInterval(showDateTime, 500);
    var f = setInterval(getForecast, 300000);
    
    //Change listener on the language settings.
    $('input[name="language"]').on('change', function(){
        updateDashbrd('language', $('input[name="language"]:checked').val());
    });
    //Change listener on the time settings.
    $('input[name="time"]').on('change', function(){
        updateDashbrd('timeFormat', $('input[name="time"]:checked').val());
    });
    //Change listener on the units settings.
    $('input[name="units"]').on('change', function(){
        updateDashbrd('units', $('input[name="units"]:checked').val());
    });
}

function getForecast(){
	$.ajax({
        type: 'GET',
        url: url,
        cache: false,
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            showData(data);
        },
        error: function () {
            console.log("An error occurred.");
            debugger;
        }
    });
}

function showData(data) {
    showAlerts(data.alerts);
    showCurrent(data.currently, data.daily.summary);
    if (forecastNbOfDays > 0) { showForecast(data.daily.data); }
    if (hourlyNbOfHours > 0) { showHourlyForecast(data.hourly.data); }
}

function showAlerts(alerts) {
    var divAlerts = $("#alerts");

    if (alerts != null && alerts.length > 0) {
        hasAlerts = true;
        var alertMessages = [];
        $.each(alerts, function (index, alert) {
            alertMessages.push(alert.title + ": " + alert.description);
        });

        divAlerts.text(alertMessages.join(" | "));
        divAlerts.show();     
    }
    else {
        hasAlerts = false;
        divAlerts.hide();     
    }
}

function showCurrent(current, summary) {
	$("#currentSummary").html(summary);
	setIcon(current.icon, "#currentIcon", true);	
	$("#currentTemp").text(getTemp(current.temperature));
	$("#currentApparentTemp").text(getTemp(current.apparentTemperature));	
	$("#currentPrec").text(getProbability(current.precipProbability));
    $("#currentWind").html(getWind(current.windSpeed, current.windBearing, showCurrentWindBearing));
    $("#currentHumidity").html(getProbability(current.humidity) + '<span>%</span>');
}

function showDateTime() {
    var now = new Date();
    $("#currentCity").text(currentCity);
    $("#currentDate").text(week[now.getDay()] + ', ' + now.getDate() + ' ' + month[now.getMonth()]);
    
    if(timeFormat == '24Hr'){
        $("#currentTime").text(now.getHours() + (now.getMinutes() < 10 ? ":0" : ":") + now.getMinutes());
    }else{
        $("#currentTime").text((now.getHours() > 12 ? (now.getHours() - 12) : now.getHours()) + (now.getMinutes() < 10 ? ":0" : ":") + now.getMinutes() + (now.getHours() > 12 ? " PM" : " AM" ) );
    }
}

function showForecast(days) {
    var i = 0;
    var now = (new Date()).setHours(0, 0, 0, 0);
    var titles = [];
    var icons = [];
    var summaries = [];
    var maxTemps = [];
    var minTemps = [];
    var winds = [];
    var humidities = [];
    var precipitations = [];
    var accumulations = [];
    
    $.each(days, function (index, day) {
        if (i >= forecastNbOfDays)
        { return false; }

        var dateTime = new Date(0);
        dateTime.setUTCSeconds(day.time);
        var dayDate = dateTime.setHours(0, 0, 0, 0);
        if (dayDate >= now || debugging) {
            titles.push('<th>' + (dayDate == now ? todayLabel : week[dateTime.getDay()]) + '</th>');
            icons.push('<td><i class="' + getIconClass(day.icon, false) + '"></i></td>');
            summaries.push('<td>' + day.summary + '</td>');
            maxTemps.push('<td>' + getTemp(day.temperatureMax) + '</td>');
            minTemps.push('<td>' + getTemp(day.apparentTemperatureMin) + '</td>');
            winds.push('<td>' + getWind(day.windSpeed, day.windBearing, showForecastWindBearing) + '</td>');
            humidities.push('<td>' + getProbability(day.humidity) + '%' + '</td>');
            precipitations.push('<td>' + getProbability(day.precipProbability) + '%' + '</td>');
			accumulations.push('<td>' + getAccumulationStr(day, 24) + '</td>');
			
            i++;
        }
    });

    $("#forecastTitles").html('<th></th>' + titles.join(""));
    $("#forecastIcons").html('<td></td>' + icons.join(""));
    $("#forecastSummaries").html('<td></td>' + summaries.join(""));
    $("#forecastMaxTemps").html('<td><div class="vertical">' + maxLabel + '</div></td>' + maxTemps.join(""));
    $("#forecastMinTemps").html('<td><div class="vertical">' + minLabel + '</div></td>' + minTemps.join(""));
    $("#forecastWind").html('<td><div class="vertical">' + windLabel + '</div></td>' + winds.join(""));
    $("#forecastHumidity").html('<td><div class="vertical">' + rhLabel + '</div></td>' + humidities.join(""));
    $("#forecastPrecipitations").html('<td><div class="vertical">' + probLabel + '</div></td>' + precipitations.join(""));
    $("#forecastAccumulations").html('<td><div class="vertical">' + accLabel + '</div></td>' + accumulations.join(""));

    var width = Math.floor(100 / forecastNbOfDays);
    $("#forecast td").css('width', width + '%');
    $("#forecastSummaries td").css('fontSize', hasAlerts ?'14px': '16px');
}

function showHourlyForecast(hourlyForecasts) {
    currentShownHrs = [];
    var hours = [];
    var icons = [];
    var temps = [];
    var winds = [];
    var humidities = [];
	var accumulations = [];
    var precipitations = [];
    var i = 0;
    var now = new Date();
    now = now.setHours(now.getHours(), 0, 0, 0);

    $.each(hourlyForecasts, function (index, hourly) {
        var dateTime = new Date(0);
        dateTime.setUTCSeconds(hourly.time);
        var dayDate = dateTime.setHours(dateTime.getHours(), 0, 0, 0);
        if (dayDate >= now || debugging) {
            hours.push("<th>" + hourlyForecastTimes(dateTime) + "</th>");
            if (showHourlyIcon){icons.push('<td><i class="' + getIconClass(hourly.icon, true) + '"></i></td>');}
            temps.push('<td>' + Math.round(hourly.temperature) + '°</td>');
            winds.push('<td>' + getWind(hourly.windSpeed, hourly.windBearing, showHourlyWindBearing) + '</td>');
            humidities.push('<td><span style="font-size:12px">rh</span> ' + getProbability(hourly.humidity) + '<span>%</span></td>');
            accumulations.push('<td>' + getAccumulationStr(hourly, 1) + '</td>');
            precipitations.push('<td>' + getProbability(hourly.precipProbability) + '<span>%</span></td>');
        }
        i++;

        if (i >= hourlyNbOfHours) {
            return false;
        }
    });

    $("#hourlyHours").html(hours.join(""));
    $("#hourlyIcons").html(icons.join(""));
    $("#hourlyTemp").html(temps.join(""));	
    $("#hourlyWind").html(winds.join(""));	
    $("#hourlyHumidity").html(humidities.join(""));	
	$("#hourlyAcc").html(accumulations.join(""));	
	$("#hourlyPrec").html(precipitations.join(""));	
}

function hideUnwantedData()
{
	if (forecastNbOfDays == 0) { $("#forecast").remove(); }
	if (hourlyNbOfHours == 0) { $("#tableHourlyForecast").remove(); }
	if (!showScrollingAlerts) { $("#alerts").remove(); }
	if (!showCurrentWeather) { $("#header").remove(); }
    if (!showCurrentIcon) { $("#currentIcon").remove(); }
    if (!showCurrentWind) { $("#windLabel").remove(); $("#currentWind").remove(); }
    if (!showCurrentHumidity) { $("#currentHumidity").remove(); $("#humidityLabel").remove(); }
	if (!showCurrentSummary) { $("#currentSummary").remove(); }
	if (!showCurrentDate) { $("#currentDate").remove(); }
	if (!showCurrentTime) { $("#currentTime").remove(); }
	if (!showForecastIcon) { $("#forecastIcons").remove(); }
	if (!showForecastSummary) { $("#forecastSummaries").remove(); }
    if (!showForecastMinTemp) { $("#forecastMinTemps").remove(); }
    if (!showForecastWind) { $("#forecastWind").remove(); }
    if (!showForecastHumidity) { $("#forecastHumidity").remove(); }
	if (!showForecastAccumulation) { $("#forecastAccumulations").remove(); }
	if (!showForecastProbability) { $("#forecastPrecipitations").remove(); }
    if (!showHourlyIcon) { $("#hourlyIcons").remove(); }
    if (!showHourlyWind) { $("#hourlyWind").remove(); }
    if (!showHourlyHumidity) { $("#hourlyHumidity").remove(); }
	if (!showHourlyAccumulation) { $("#hourlyAcc").remove(); }
	if (!showHourlyProbability) { $("#hourlyPrec").remove(); }
	if (!showDarkSkyLink) { $("#darkSkyLink").remove(); }
}

function setIcon(icon, id, keepNight) {
	$(id).attr('class', getIconClass(icon, keepNight));
}

function getIconClass(icon, keepNight, isVisible) {
    return 'icon icon-' + (keepNight ? icon.replace(/-|day/ig, "") : icon.replace(/-|day|night/ig, ""));
}

function getTemp(temp) {
    return Math.round(temp) + '°' + degreeSymbol;
}

function getProbability(probability) {
    return probability == null ? 0 : Math.round(probability * 100);
}

function getAccumulationStr(forecastItem, multiplier)
{
	var accumulation = forecastItem.precipAccumulation != null ? forecastItem.precipAccumulation :
						       (forecastItem.precipIntensity != null ? forecastItem.precipIntensity * multiplier : 0);
							   
	var acc = (accumulation > 0 && accumulation < 1) ? (Math.round(accumulation*10)/10).toString().replace("0.",".") : Math.round(accumulation)
	return acc + '<span style="font-size:14px">' + (forecastItem.precipType == 'snow' ? snowPrecUnit : rainPrecUnit) + '</span>';
}

function getWind(speed, deg, showWindBearing) {
    var strWind = '<span>' + Math.round(speed) + '</span>' + windUnit;
    if (showWindBearing)
    {
        strWind = strWind + '<span class="windContainer"><span class="wind" style="transform: rotate(' + deg + 'deg);">↑</span></span>'
    }
    return strWind;
}

function codeLatLng(lat, lng) {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                //formatted address
                console.log(results[0].address_components)
                //find city name
                for (var i = 0; i < results[0].address_components.length; i++) {
                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                        
                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "locality") {
                            //this is the object you are looking for
                            currentCity = results[0].address_components[i].long_name;
                            break;
                        }
                    }
                }
            } else {
                city = {
                    short_name: "No city found!",
                    long_name: "No city found!"
                };
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}

function updateDashbrd(type, selectedValue){
    switch(type){
        case 'language':
            selectedLang = selectedValue;
            //Update url
            url = baseUrl + apiKey + '/' + latitude + ',' + longitude + '?lang=' + selectedLang + '&exclude=minutely&units=' + selectedUnits;
            getForecast();
            // Set Language for labels.
            todayLabel = langLabels[selectedLang].todayLabel;
            windLabel = langLabels[selectedLang].windLabel;
            apparentTempLabel = langLabels[selectedLang].apparentTempLabel;
            week = langLabels[selectedLang].week;
            month = langLabels[selectedLang].month;
            maxLabel = langLabels[selectedLang].maxLabel;
            minLabel = langLabels[selectedLang].minLabel;
            windLabel = langLabels[selectedLang].windLabel;
            rhLabel = langLabels[selectedLang].rhLabel;
            accLabel = langLabels[selectedLang].accLabel;
            probLabel = langLabels[selectedLang].probLabel;
            break;
        case 'timeFormat':
            timeFormat = selectedValue;
            getForecast();
            //showDateTime();
            //hourlyForecastTimes(timeFormat);
            break;
        case 'units':
            selectedUnits = selectedValue;
            //Update url
            url = baseUrl + apiKey + '/' + latitude + ',' + longitude + '?lang=' + selectedLang + '&exclude=minutely&units=' + selectedUnits;
            getForecast();
            //Set Units
            degreeSymbol = unitLabels[selectedUnits].degreeSymbol;
            rainPrecUnit = unitLabels[selectedUnits].rainPrecUnit;
            snowPrecUnit = unitLabels[selectedUnits].snowPrecUnit;
            windUnit = unitLabels[selectedUnits].windUnit;
            break;
        default:
            break;
    }    
}

function hourlyForecastTimes(dtTime){
    if(timeFormat == '12Hr'){
        console.log(dtTime.getHours());
        console.log(parseInt(dtTime.getHours()) > 11);
        return ( (dtTime.getHours() > 11) ? ((dtTime.getHours() - 12) + "PM") : (dtTime.getHours() + "AM") );
    }else{
        return dtTime.getHours() + ":00";
    }
}