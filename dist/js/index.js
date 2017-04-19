$(document).ready(function () {
    $("nav ul.nav a").click(function () {
        $("section").removeClass("animated fadeIn");

        var target = $(this).attr("href");
        $(target).addClass("animated fadeIn");
    });

    var showcaseItems = ["portfolio - sandeep khandewale", "tribute - Kishori Amonkar", "random quote machine", "local weather", "wikipedia viewer", "twitch.tv json api", "calc", "pomodoro clock", "tic-tac-toe game", "simon game"];
    var addToEl = $("#showcase .showcaseItems");
    showcaseItems.forEach(function (v) {
        var markup = "\n        <div class=\"col-md-6\">\n            <div class='thumbnail'>                \n                <div class='caption'>\n                    <h5>" + v + " <small> Lorel Ipsum... </small></h5>\n                </div>\n            </div>\n        </div>";

        $(markup).appendTo("#showcase .row#showcaseItems");
    });
});