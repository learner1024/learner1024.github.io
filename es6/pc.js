var PCUtils = {
    formatMicroseconds: function(sss){
        //sss is in ms e.g. 1494999
        //get the seconds part
        var s = Math.floor(sss / 1000); // 1494
        //get the minutes and seconds part
        var ms = s % 60; // 54
        var mm = (s - ms) / 60; //24
        return `${mm}:${ms}`;
    },
    PCStates : {
        fresh: 'f',
        sessionInProgress: 's',
        breakInProgress: 'b',
        sessionPaused: 'p',
        terminated: 't'
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

    this.setState(PCUtils.PCStates.fresh);
    this.sessionTimer = null;
    this.breakTimer = null;
}

PomodoroClock.prototype.setState = function(s){
    this.PCState = s;
    this.callbackFnStateChanged(this.PCState);
}

PomodoroClock.prototype.initBreak = function(){
    this.setState(PCUtils.PCStates.breakInProgress);
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
    this.setState(PCUtils.PCStates.sessionInProgress);
    this.startEpoch = (new Date()).getTime(); 
    this.endEpoch = this.startEpoch + (this.sessionMinutes * 60000);    
    this.sessionTimer = setInterval(() => {
        if(!(this.PCState == PCUtils.PCStates.sessionPaused)){
            var diff = this.endEpoch - (new Date()).getTime();
            if(diff < 0){
                clearInterval(this.sessionTimer);
                this.initBreak();
            }
            else{
                this.callbackFnSession(diff);
            } 
        }
        else{
            this.endEpoch += 1000;
        }
    }, 999);
}

PomodoroClock.prototype.pauseResume = function(){
    if(this.PCState == PCUtils.PCStates.sessionInProgress){
        this.setState(PCUtils.PCStates.sessionPaused);
        this.pauseEpoch = (new Date()).getTime();
    }
    else if(this.PCState == PCUtils.PCStates.sessionPaused){
        this.setState(PCUtils.PCStates.sessionInProgress);
        this.resumeEpoch = (new Date()).getTime();
    }
    
}

PomodoroClock.prototype.term = function(){
    clearInterval(this.sessionTimer);
    clearInterval(this.breakTimer);
    this.sessionTimer = null;
    this.breakTimer = null;
    this.startEpoch = undefined;
    this.endEpoch = undefined;
    this.setState(PCUtils.PCStates.terminated);
}