$(document).ready(function() {
    $("ul.nav-stacked a").click(function () {
        $("div.pfsection").removeClass("animated fadeIn");
        
        var target = $(this).attr("href");
        $(target).addClass("animated fadeIn");
    });
});