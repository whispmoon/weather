$(document).ready(function () {


    $('#form').submit(interceptEvent);

    function interceptEvent(ev) {
        var city = $('#search').val();
        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",fr&appid=25527e97f053c287e4377c35a63bc764&units=metric";
        let url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",fr&appid=25527e97f053c287e4377c35a63bc764&units=metric";
        ev.preventDefault();
        getWeather(url, city);
        getForecast(url2);
    }


    function getWeather(url, city) {
        $("#city").empty();
        $("#cityTemp").empty();
        $("#cityResults").empty();

        $.getJSON(url).then(function (data) {
            console.log(data);
            var dt = new Date(data.dt * 1000);
            var sunrise = new Date(data.sys.sunrise * 1000);
            var sunset = new Date(data.sys.sunset * 1000);
            let gLat = data.coord.lat;
            let gLon = data.coord.lon;
            let gUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + gLat + ',' + gLon + '&zoom=10&size=200x200&key=AIzaSyDBiYYa2UCyn-jYkAu5DvJ6UZOnQ0wO0oY';

            $("#city").append("<h3>" + data.name + "</h3>");

            $("#cityTemp").append("<span><dt> Température :</dt> " + data.main.temp + " °C</span>");
            $("#cityTemp").append('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">');
            $("#cityTemp").append('<img class="gMap" src="' + gUrl + '">');

            $("#cityResults").append("<span><dt>Heure de mesure :</dt> " + dt.getHours() + "h" + dt.getMinutes() + "mn");
            $("#cityResults").append("<span><dt>Lever du soleil :</dt> " + sunrise.getHours() + "h" + sunrise.getMinutes() + "mn");
            $("#cityResults").append("<span><dt>Coucher du soleil :</dt> " + sunset.getHours() + "h" + sunset.getMinutes() + "mn");
            $("#cityResults").append('<div class="hr">');
            $("#cityResults").append("<span><dt>Humidité :</dt> " + data.main.humidity + " %");
            $("#cityResults").append("<span><dt>Pression :</dt> " + data.main.pressure + " hPA");
            $("#cityResults").append('<div class="hr">');
            $("#cityResults").append("<span><dt>Vitesse du vent :</dt> " + data.wind.speed + " km/h");
        });

    }

    function getForecast(url) {
        $("#forecast").empty();
        $("#forecastCityName").empty();
        $.getJSON(url).then(function (data) {
            let weekday = [
                "Dimanche",
                "Lundi",
                "Mardi",
                "Mercredi",
                "Jeudi",
                "Vendredi",
                "Samedi"
            ];

            $("#forecastCityName").append("<h3>Prévisions météo de " + data.city.name + " (sur 5 jours) :</h3>");

            let reg = /12:00:00$/;

            for (i = 0; i < data.list.length; i++) {

                let date = new Date(data.list[i].dt * 1000);
                if (data.list[i].dt_txt.match(reg)) {

                    $("#forecast").append('<div id="inlineForecast' + i + '" class="inlineForecast">');
                    $("#inlineForecast" + i).append(weekday[date.getDay()] + " à 12h00 (GMT):");
                    $("#inlineForecast" + i).append('<img src="http://openweathermap.org/img/w/' + data.list[i].weather["0"].icon + '.png">');
                    $("#inlineForecast" + i).append("Température : " + data.list[i].main.temp + " °C");
                }
            }
        });
    }


});