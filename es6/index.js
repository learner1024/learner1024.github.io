$(document).ready(function(){
    var showcaseItems = ["portfolio - sandeep khandewale", 
        "tribute - Kishori Amonkar", 
        "random quote machine",
        "local weather",
        "wikipedia viewer",
        "twitch.tv json api",
        "calc",
        "pomodoro clock",
        "tic-tac-toe game",
        "simon game"];
    var addToEl = $("#showcase .showcaseItems");
    showcaseItems.forEach(function(v){
        var markup = `
        <div class="col-xs-4">
            <div class='thumbnail'>
                <img src='//placehold.it/100'>
                <div class='caption'>
                    <p>${v}</p>
                </div>
            </div>
        </div>`;

        $(markup).appendTo("#showcase .row#showcaseItems");
    })
})