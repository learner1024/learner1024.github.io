var apiUrl = "https://wind-bow.glitch.me/twitch-api/";
var channelNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"]; //"storbeck"
var channelsResult = [];
var renderResults = function renderResults(online, offline) {
  $("#results").empty();
  var filter = $("#filterText").val().length > 2 ? $("#filterText").val() : "";

  channelsResult.forEach(function (c) {
    var filtered = true;
    if (filter && c.name.indexOf(filter) == -1) {
      filtered = false;
    }

    var markup = "\n    <div class='row well'>\n      <div class='col-xs-4'>\n        <img class='img-responsive' src='" + c.logo + "'/>      \n      </div>\n      <div class='col-xs-8'>\n        <a href='" + c.url + "'><h3>" + c.display_name + "</h3></a>\n      </div>\n    </div>";

    if (filtered && online && offline) $("#results").append(markup);else if (filtered && online && c.mature) $("#results").append(markup);else if (filtered && offline && !c.mature) $("#results").append(markup);
  });
};
$(document).ready(function () {
  channelNames.forEach(function (c, i) {
    $.getJSON(apiUrl + "channels/" + c, function (res) {
      channelsResult.push(res);
      if (i == channelNames.length - 1) renderResults(true, true);
    });
  });

  $("#filterText").on("change paste keyup", function () {
    var filterText = $("#filterText").val();
    var online = $("#btnAll").hasClass("active") || $("#btnOnline").hasClass("active");
    var offline = $("#btnAll").hasClass("active") || $("#btnOffline").hasClass("active");
    renderResults(online, offline);
  });

  $("#btnAll").click(function () {
    $("#btnAll").addClass("active");
    $("#btnOnline").removeClass("active");
    $("#btnOffline").removeClass("active");

    //render All results
    renderResults(true, true);
  });
  $("#btnOnline").click(function () {
    $("#btnAll").removeClass("active");
    $("#btnOnline").addClass("active");
    $("#btnOffline").removeClass("active");

    //render online results
    renderResults(true, false);
  });
  $("#btnOffline").click(function () {
    $("#btnAll").removeClass("active");
    $("#btnOnline").removeClass("active");
    $("#btnOffline").addClass("active");

    //render offline results
    renderResults(false, true);
  });
});