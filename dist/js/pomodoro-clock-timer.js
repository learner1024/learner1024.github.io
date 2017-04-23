$(document).ready(function () {
    var _sessionMinutesChangedCallback = function _sessionMinutesChangedCallback(ellapsedMinutes) {
        $("#sessionDisplay").text(ellapsedMinutes);
    };
    var _breakMinutesChangedCallback = function _breakMinutesChangedCallback(ellapsedMinutes) {
        $("#breakDisplay").text(ellapsedMinutes);
    };
    var pcOpts = {
        sessionMinutes: 0.2,
        breakMinutes: 0.2,
        sessionMinutesChangedCallback: _sessionMinutesChangedCallback,
        breakMinutesChangedCallback: _breakMinutesChangedCallback
    };

    var pc = new PomodoroClock(pcOpts);
    pc.go();
});