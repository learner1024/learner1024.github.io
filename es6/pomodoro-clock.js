var PCStates = {
    fresh: 'f',
    inprogress: 'i',
    paused: 'p',
    terminated: 't'
}
var PomodoroClock = function(opts){

    if(!opts.callbackFn){
        throw new Error("you should provide callback function for PomodoroClock");
    }

    this.callbackFn = opts.callbackFn;
    this.sessionMinutes = opts.sessionMinutes || 25;
    this.breakMinutes = opts.breakMinutes || 5;

    this.PCState = PCStates.fresh;
    this.timer = null;
    this.zero = null;
}

PomodoroClock.prototype.init = function(){
    var that = this;
    this.zero = (new Date()).getTime();
    this.PCState = PCStates.inprogress;
    this.timer = setInterval(function(){
        that.callbackFn((new Date()).getTime() - that.zero);
    }, 1000);
}

PomodoroClock.prototype.resume = function(){
    this.PCState = PCStates.inprogress;
}

PomodoroClock.prototype.term = function(){
    clearInterval(this.timer);
    this.PCState = PCStates.terminated;
}

PomodoroClock.prototype.pause = function(){
    this.PCState = PCStates.paused;
}

$(document).ready(function(){
    var pcChangeHandler = function(changedVal){
        $("#pcDisplay").text(changedVal);
    }
    var pc = new PomodoroClock({callbackFn: pcChangeHandler});

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

    $("#breakMinutes").text(pc.breakMinutes);
    $("#sessionMinutes").text(pc.sessionMinutes);

    $("#minusBreakMinutes").click(function(){        
        if(pc.breakMinutes > 1){
            $("#breakMinutes").text(--pc.breakMinutes)
        }
    });
    $("#plusBreakMinutes").click(function(){
        $("#breakMinutes").text(++pc.reakMinutes)
    });
    $("#minusSessionMinutes").click(function(){
        if(pc.sessionMinutes > 0){
            $("#sessionMinutes").text(--pc.sessionMinutes)
        }
    });
    $("#plusSessionMinutes").click(function(){
        $("#sessionMinutes").text(++pc.sessionMinutes)
    });
})