var PCStates = {
    fresh: 'f',
    sessionInProgress: 's',
    breakInProgress: 'b',
    paused: 'p',
    terminated: 't'
}
var Utils = {
    formatMicroseconds: function(sss){
        //sss is in ms e.g. 1494999
        //get the seconds part
        var s = Math.floor(sss / 1000); // 1494
        //get the minutes and seconds part
        var ms = s % 60; // 54
        var mm = (s - ms) / 60; //24
        return `${mm}:${ms}`;
    }
}
var PomodoroClock = function(opts){

    if(!opts.callbackFnSession || !opts.callbackFnBreak || !opts.callbackFnStateChanged){
        throw new Error("you should provide callback function for PomodoroClock for session break both");
    }

    this.callbackFnSession = opts.callbackFnSession;
    this.callbackFnBreak = opts.callbackFnBreak;
    this.callbackFnStateChanged = opts.callbackFnStateChanged;
    
    this.sessionMinutes = opts.sessionMinutes || 1;
    this.breakMinutes = opts.breakMinutes || 1;

    this.setState(PCStates.fresh);
    this.sessionTimer = null;
    this.breakTimer = null;
}

PomodoroClock.prototype.setState = function(s){
    this.PCState = s;
    this.callbackFnStateChanged(this.PCState);
}

PomodoroClock.prototype.initBreak = function(){
    this.setState(PCStates.breakInProgress);
    this.startEpoch = (new Date()).getTime(); 
    this.endEpoch = this.startEpoch + (this.breakMinutes * 60000);    
    this.breakTimer = setInterval(() => {
        var diff = this.endEpoch - (new Date()).getTime();
        if(diff < 0){
            clearInterval(this.breakTimer);
            this.initSession();
        }
        else{
            this.callbackFnBreak(diff);
        } 
    }, 999);
}

PomodoroClock.prototype.initSession = function(){
    this.setState(PCStates.sessionInProgress);
    this.startEpoch = (new Date()).getTime(); 
    this.endEpoch = this.startEpoch + (this.sessionMinutes * 60000);    
    this.sessionTimer = setInterval(() => {
        var diff = this.endEpoch - (new Date()).getTime();
        if(diff < 0){
            clearInterval(this.sessionTimer);
            this.initBreak();
        }
        else{
            this.callbackFnSession(diff);
        } 
    }, 999);
}

// PomodoroClock.prototype.pauseResume = function(){
//     if(pc.PCState == PCStates.paused){
//         this.PCState = PCStates.sessionInProgress;
//     }
//     else if(pc.PCState == PCStates.inprogress){
//         this.PCState = PCStates.paused;
//     }
    
// }

PomodoroClock.prototype.term = function(){
    clearInterval(this.sessionTimer);
    clearInterval(this.breakTimer);
    this.sessionTimer = null;
    this.breakTimer = null;
    this.startEpoch = undefined;
    this.endEpoch = undefined;
    this.setState(PCStates.terminated);
}



$(document).ready(function(){
    
    var pcStateChangedHandler = function(latestState){
        $("#presentState").text(latestState);
        switch(latestState){
            case PCStates.sessionInProgress:
                $("#breakDisplay").addClass("hide");
                $("#sessionDisplay").removeClass("hide");
                break;
            case PCStates.breakInProgress:
                $("#breakDisplay").removeClass("hide");
                $("#sessionDisplay").addClass("hide");
                break;
        }
    }

    var sessionChangeHandler = function(changedVal){
        $("#sessionDisplay").text(Utils.formatMicroseconds(changedVal));
    }
    var breakChangeHandler = function(changedVal){
        $("#breakDisplay").text(Utils.formatMicroseconds(changedVal));
    }
    
    var pc = new PomodoroClock({callbackFnSession: sessionChangeHandler, callbackFnBreak: breakChangeHandler, callbackFnStateChanged: pcStateChangedHandler});

    var displayDefault = function(){
        $("#breakDisplay").text(`${pc.breakMinutes}:00`);
        $("#sessionDisplay").text(`${pc.sessionMinutes}:00`);
    }

    displayDefault();


    $("#start").click(function(){
        pc.initSession();
    });
    // $("#pauseResume").click(function(){
    //     pc.pauseResume();
    // });
    $("#term").click(function(){
        pc.term();
        displayDefault();
    });

    $("#breakMinutes").text(pc.breakMinutes);
    $("#sessionMinutes").text(pc.sessionMinutes);

    $("#minusBreakMinutes").click(function(){        
        if(pc.breakMinutes > 1){
            $("#breakMinutes").text(--pc.breakMinutes)
        }
    });
    $("#plusBreakMinutes").click(function(){
        $("#breakMinutes").text(++pc.breakMinutes)
    });
    $("#minusSessionMinutes").click(function(){
        if(pc.sessionMinutes > 1){
            $("#sessionMinutes").text(--pc.sessionMinutes)
        }
    });
    $("#plusSessionMinutes").click(function(){
        $("#sessionMinutes").text(++pc.sessionMinutes)
    });
})