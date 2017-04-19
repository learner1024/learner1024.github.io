var apiUrl = "https://wind-bow.glitch.me/twitch-api/";
var channelNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"]; //"storbeck"
var channelsResult = [];
var renderResults = function(online, offline){
  $("#results").empty();
  var filter = $("#filterText").val().length > 2 ? $("#filterText").val() : "";
  
  channelsResult.forEach(function(c){
    var filtered = true;
    if(filter && c.name.indexOf(filter) == -1){
      filtered = false;
    }
    if(filtered && online && offline)
      $("#results").append("<li><a target='_blank' href='" + c.url + "'>" + c.display_name + "</a><img src='"+ c.logo +"'/></li>");        
    else if(filtered && online && c.mature)
      $("#results").append("<li><a target='_blank' href='" + c.url + "'>" + c.display_name + "</a><img src='"+ c.logo +"'/></li>");
    else if(filtered && offline && !c.mature)
      $("#results").append("<li><a target='_blank' href='" + c.url + "'>" + c.display_name + "</a><img src='"+ c.logo +"'/></li>");
  });

}
$(document).ready(function(){
  channelNames.forEach(function(c, i){
    $.getJSON(apiUrl + "channels/" + c, function(res){
      channelsResult.push(res); 
      if(i == channelNames.length - 1)
        renderResults(true, true);
    }); 
  })
  
  $("#filterText").on("change paste keyup", function(){
    var filterText = $("#filterText").val();
    var online = $("#btnAll").hasClass("active") || $("#btnOnline").hasClass("active");
    var offline = $("#btnAll").hasClass("active") || $("#btnOffline").hasClass("active");
    renderResults(online, offline);
  })
  
  $("#btnAll").click(function(){
    $("#btnAll").addClass("active");
    $("#btnOnline").removeClass("active");
    $("#btnOffline").removeClass("active");
    
    //render All results
    renderResults(true, true);
  })
  $("#btnOnline").click(function(){
    $("#btnAll").removeClass("active");
    $("#btnOnline").addClass("active");
    $("#btnOffline").removeClass("active");
    
    //render online results
    renderResults(true, false);
  })
  $("#btnOffline").click(function(){
    $("#btnAll").removeClass("active");
    $("#btnOnline").removeClass("active");
    $("#btnOffline").addClass("active");
    
    //render offline results
    renderResults(false, true);
  })  
})