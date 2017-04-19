$(document).ready(function(){
  $("#genQuote").on("click", function(){
    $.getJSON("https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en", function(response){
      $("#quoteText").text(response.quoteText);
      $("#quoteAuthor").text(response.quoteAuthor);
    })
  })
});