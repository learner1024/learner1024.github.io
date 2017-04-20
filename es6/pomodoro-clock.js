var PCStates = {
    fresh: 'f',
    inprogress: 'i',
    paused: 'p',
    terminated: 't'
}
var PomodoroClock = function(s, b){
    this.sessionMinutes = s || 25;
    this.breakMinutes = b || 5;
    this.PCState = PCStates.fresh;
    this.timer = null;
    this.zero = null;
}

PomodoroClock.prototype.init = function(){
    this.zero = (new Date()).getTime();
    this.PCState = PCStates.inprogress;
    this.timer = setInterval(function(){

    }, 1000);
}

PomodoroClock.prototype.resume = function(){
    this.PCState = PCStates.inprogress;
}

PomodoroClock.prototype.term = function(){
    this.PCState = PCStates.terminated;
}

PomodoroClock.prototype.pause = function(){
    this.PCState = PCStates.paused;
}

$(document).ready(function(){
    var pc = new PomodoroClock();

    $("#start").click(function(){
        pc.init();
    });
    $("#pauseResume").click(function(){
        if(pc.PCState == PCStates.paused){
            pc.resume();
        }
        else if(pc.PCState == PCStates.inprogress){
            pc.pause();
        }
    });
    $("#term").click(function(){
        pc.term();
    });

    $("#breakMinutes").text(breakMinutes);
    $("#sessionMinutes").text(sessionMinutes);

    $("#minusBreakMinutes").click(function(){        
        if(breakMinutes > 1){
            $("#breakMinutes").text(--breakMinutes)
        }
    });
    $("#plusBreakMinutes").click(function(){
        $("#breakMinutes").text(++breakMinutes)
    });
    $("#minusSessionMinutes").click(function(){
        if(sessionMinutes > 0){
            $("#sessionMinutes").text(--sessionMinutes)
        }
    });
    $("#plusSessionMinutes").click(function(){
        $("#sessionMinutes").text(++sessionMinutes)
    });
})