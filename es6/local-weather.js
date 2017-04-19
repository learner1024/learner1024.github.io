var url = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?appid=81d02eb5b321acb3380e5063ec97f32f";
var urlWithQry = "";
var accuracy = 1121;
var lat;//= 19.1850251;//damn geolocation wouldnt work without https so I had to hardcode
var lon;//= 72.9726882;//
navigator.geolocation.getCurrentPosition(function(pos){
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    var qry = "lat=" + lat + "&lon=" + lon;    
    urlWithQry = url + "&" + qry;
});

var fetchWeather = function(){
  $.getJSON(urlWithQry, function(res){
    if($("#btnC").hasClass("active")){
      $("#temp").html(TempConverter.kToC(res.main.temp) + "&#8451;");
    }
    else if($("#btnF").hasClass("active")){
      $("#temp").html(TempConverter.kToF(res.main.temp) + "&#8457;");
    }

    $("#locName").text(res.name);

    $("#weatherIcon").prop("src", "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png");
    $("#weatherDescr").text(res.weather[0].description);
  })
}

var TempConverter = {
  kToF : function(k){
    var f = (k * 9/5) - 459.67;
    return f.toFixed(2)
  },
  kToC : function(k){
    var c = k - 273.15;
    return c.toFixed(2);
  }
}

$(document).ready(function(){
  $("#btnF").on("click", function(){
    if($("#btnF").hasClass("active") == false){
      $("#btnF").addClass("active");
    }
    $("#btnC").removeClass("active");
    fetchWeather();
  })
  $("#btnC").on("click", function(){
    if($("#btnC").hasClass("active") == false){
      $("#btnC").addClass("active");
    }
    $("#btnF").removeClass("active");
    fetchWeather();
  })
  $("#getWeather").on("click", function(){
    fetchWeather();
  })
});

