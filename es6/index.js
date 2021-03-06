$(document).ready(function(){

    var showcaseItems = [
        {
            title: "My Portfolio (old)",
            //subtitle: "FreeCodeCamp Basic level front end project",
            hyperlink: "/portfolio-old.html"
        },
        {
            title: "Tribute to Kishori Amonkar",
            //subtitle: "FreeCodeCamp Basic level front end project",
            hyperlink: "/tribute-page.html"
        },
        {
            title: "Random Quote Machine",
            //subtitle: "int",
            hyperlink: "/quote-machine.html"
        },
        {
            title: "Local Weather",
            //subtitle: "My Portfolio",
            hyperlink: "/local-weather.html"
        },
        {
            title: "Wikipedia Viewer",
            //subtitle: "My Portfolio",
            hyperlink: "/wiki-viewer.html"
        },
        {
            title: "TwitchTV JSON API",
            //subtitle: "My Portfolio",
            hyperlink: "/twitch-dir.html"
        },
        {
            title: "Calculator",
            //subtitle: "My Portfolio",
            hyperlink: "/js-calc.html"
        },
        {
            title: "Pomodoro Clock",
            //subtitle: "My Portfolio",
            hyperlink: "/pomodoro-clock.html"
        },
        {
            title: "Tic Tac Toe Game",
            //subtitle: "My Portfolio",
            hyperlink: "/ttt.html"
        },
        {
            title: "Simon Game",
            //subtitle: "My Portfolio",
            hyperlink: "/simon.html"
        }

    ];

    showcaseItems.forEach(function(o){
        var markup = `
        <div class="col">
            <div class="card">
                <div class="card-block">
                    <h4 class="card-title">${o.title}</h4>
                    <!--h6 class="card-subtitle mb2 text-muted">${o.subtitle}</h6-->
                    <p class="card-text">Click <a class="card-link" href="${o.hyperlink}" target="_blank">here</a> to visit</p>
                    
                </div>
            </div>
        </div>`;

        $(markup).appendTo("#showcase .row");
    })
})