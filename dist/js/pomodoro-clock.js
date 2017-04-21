var PCStates = {
    fresh: 'f',
    sessionInProgress: 's',
    breakInProgress: 'b',
    paused: 'p',
    terminated: 't'
};
var Utils = {
    formatMicroseconds: function formatMicroseconds(sss) {
        //sss is in ms e.g. 1494999
        //get the seconds part
        var s = Math.floor(sss / 1000); // 1494
        //get the minutes and seconds part
        var ms = s % 60; // 54
        var mm = (s - ms) / 60; //24
        return mm + ':' + ms;
    }
};
var PomodoroClock = function PomodoroClock(opts) {

    if (!opts.callbackFnSession || !opts.callbackFnBreak) {
        throw new Error("you should provide callback function for PomodoroClock for session break both");
    }

    this.callbackFnSession = opts.callbackFnSession;
    this.callbackFnBreak = opts.callbackFnBreak;

    this.sessionMinutes = opts.sessionMinutes || 1;
    this.breakMinutes = opts.breakMinutes || 1;

    this.PCState = PCStates.fresh;
    this.sessionTimer = null;
    this.breakTimer = null;
};

PomodoroClock.prototype.initBreak = function () {
    var _this = this;

    this.PCState = PCStates.breakInProgress;
    this.startEpoch = new Date().getTime();
    this.endEpoch = this.startEpoch + this.breakMinutes * 60000;
    this.breakTimer = setInterval(function () {
        var diff = _this.endEpoch - new Date().getTime();
        if (diff < 0) {
            clearInterval(_this.breakTimer);
            _this.initSession();
        } else {
            _this.callbackFnBreak(diff);
        }
    }, 999);
};

PomodoroClock.prototype.initSession = function () {
    var _this2 = this;

    this.PCState = PCStates.sessionInProgress;
    this.startEpoch = new Date().getTime();
    this.endEpoch = this.startEpoch + this.sessionMinutes * 60000;
    this.sessionTimer = setInterval(function () {
        var diff = _this2.endEpoch - new Date().getTime();
        if (diff < 0) {
            clearInterval(_this2.sessionTimer);
            _this2.initBreak();
        } else {
            _this2.callbackFnSession(diff);
        }
    }, 999);
};

// PomodoroClock.prototype.pauseResume = function(){
//     if(pc.PCState == PCStates.paused){
//         this.PCState = PCStates.sessionInProgress;
//     }
//     else if(pc.PCState == PCStates.inprogress){
//         this.PCState = PCStates.paused;
//     }

// }

PomodoroClock.prototype.term = function () {
    clearInterval(this.sessionTimer);
    clearInterval(this.breakTimer);
    this.sessionTimer = null;
    this.breakTimer = null;
    this.startEpoch = undefined;
    this.endEpoch = undefined;
    this.PCState = PCStates.terminated;
};

$(document).ready(function () {
    var sessionChangeHandler = function sessionChangeHandler(changedVal) {
        $("#sessionDisplay").text(Utils.formatMicroseconds(changedVal));
    };
    var breakChangeHandler = function breakChangeHandler(changedVal) {
        $("#breakDisplay").text(Utils.formatMicroseconds(changedVal));
    };

    var pc = new PomodoroClock({ callbackFnSession: sessionChangeHandler, callbackFnBreak: breakChangeHandler });

    $("#start").click(function () {
        pc.initSession();
    });
    // $("#pauseResume").click(function(){
    //     pc.pauseResume();
    // });
    $("#term").click(function () {
        pc.term();
        $("#breakDisplay").text("");
        $("#sessionDisplay").text("");
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