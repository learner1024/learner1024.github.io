$(document).ready(function () {

    var pcStateChangedHandler = function pcStateChangedHandler(latestState) {
        $("#presentState").text(latestState);
        switch (latestState) {
            case PCUtils.PCStates.sessionInProgress:
                $("#breakDisplay").addClass("hide");
                $("#sessionDisplay").removeClass("hide");
                break;
            case PCUtils.PCStates.breakInProgress:
                $("#breakDisplay").removeClass("hide");
                $("#sessionDisplay").addClass("hide");
                break;
        }
    };

    var sessionChangeHandler = function sessionChangeHandler(changedVal) {
        $("#sessionDisplay").text(PCUtils.formatMicroseconds(changedVal));
    };
    var breakChangeHandler = function breakChangeHandler(changedVal) {
        $("#breakDisplay").text(PCUtils.formatMicroseconds(changedVal));
    };

    var pc = new PomodoroClock({ callbackFnSession: sessionChangeHandler, callbackFnBreak: breakChangeHandler, callbackFnStateChanged: pcStateChangedHandler });

    var displayDefault = function displayDefault() {
        $("#breakDisplay").text(pc.breakMinutes + ":00");
        $("#sessionDisplay").text(pc.sessionMinutes + ":00");
    };

    displayDefault();

    $("#start").click(function () {
        pc.initSession();
    });
    $("#pauseResume").click(function () {
        pc.pauseResume();
    });
    $("#term").click(function () {
        pc.term();
        displayDefault();
    });

    $("#breakMinutes").text(pc.breakMinutes);
    $("#sessionMinutes").text(pc.sessionMinutes);

    $("#minusBreakMinutes").click(function () {
        if (pc.breakMinutes > 1) {
            $("#breakMinutes").text(--pc.breakMinutes);
        }
    });
    $("#plusBreakMinutes").click(function () {
        $("#breakMinutes").text(++pc.breakMinutes);
    });
    $("#minusSessionMinutes").click(function () {
        if (pc.sessionMinutes > 1) {
            $("#sessionMinutes").text(--pc.sessionMinutes);
        }
    });
    $("#plusSessionMinutes").click(function () {
        $("#sessionMinutes").text(++pc.sessionMinutes);
    });
});