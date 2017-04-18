$(document).ready(function () {
    var showcaseItems = ["portfolio - sandeep khandewale", "tribute - Kishori Amonkar", "random quote machine", "local weather", "wikipedia viewer", "twitch.tv json api", "calc", "pomodoro clock", "tic-tac-toe game", "simon game"];
    var addToEl = $("#showcase .showcaseItems");
    showcaseItems.forEach(function (v) {
        var markup = "\n        <div class=\"col-xs-4\">\n            <div class='thumbnail'>\n                <img src='//placehold.it/100'>\n                <div class='caption'>\n                    <p>" + v + "</p>\n                </div>\n            </div>\n        </div>";

        $(markup).appendTo("#showcase .row#showcaseItems");
    });
});