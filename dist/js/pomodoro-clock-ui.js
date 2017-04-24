$(document).ready(function () {

    var pcOpts = {
        sessionMinutes: 2,
        breakMinutes: 1,
        sessionMinutesChangedCallback: function sessionMinutesChangedCallback(ellapsedMinutes) {
            $("#sessionDisplay").text(ellapsedMinutes);
        },
        breakMinutesChangedCallback: function breakMinutesChangedCallback(ellapsedMinutes) {
            $("#breakDisplay").text(ellapsedMinutes);
        }
    };

    $("#breakDisplay").text(pcOpts.breakMinutes + ":00");
    $("#sessionDisplay").text(pcOpts.sessionMinutes + ":00");
    $("#breakMinutes").text(pcOpts.breakMinutes);
    $("#sessionMinutes").text(pcOpts.sessionMinutes);

    var pc = new PomodoroClock(pcOpts);

    $("#start").click(function () {
        pc.go();
    });
    $("#pause").click(function () {
        pc.pause();
    });
    $("#resume").click(function () {
        pc.resume();
    });
    $("#term").click(function () {
        pc.reset();
        $("#breakDisplay").text(pcOpts.breakMinutes + ":00");
        $("#sessionDisplay").text(pcOpts.sessionMinutes + ":00");
    });
});