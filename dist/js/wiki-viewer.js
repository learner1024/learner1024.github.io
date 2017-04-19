$(document).ready(function () {
  $("#btnSearchWiki").on("click", function () {
    var txtToSearch = $("#searchText").val();
    if (txtToSearch) {
      searchWiki(txtToSearch);
    }
  });
});

var wikiApiUrl = "https://crossorigin.me/http://en.wikipedia.org/w/api.php?";
var wikiSearchApiParams = ["action=query", "gsrsearch=cat", "generator=search", "format=json", "gsrprop=snippet", "prop=info", "inprop=url"];
var searchWiki = function searchWiki(searchText) {
  wikiSearchApiParams[1] = "gsrsearch=" + encodeURI(searchText);
  var finalUrl = wikiApiUrl + wikiSearchApiParams.join("&");
  $.getJSON(finalUrl, function (res) {
    var pageIds = Object.keys(res.query.pages);
    var searchResults = pageIds.map(function (k) {
      return {
        text: res.query.pages[k].title,
        url: "https://en.wikipedia.org/?curid=" + k
      };
    });
    console.log(searchResults);
    $("#searchResults").empty();
    searchResults.forEach(function (v) {
      $("#searchResults").append("<li><a target='_blank' href='" + v.url + "'>" + v.text + "</a></li>");
    });
  });
};