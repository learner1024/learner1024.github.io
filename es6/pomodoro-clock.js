var secondToMMSS = function(seconds){
    var secondsPart = seconds % 60;
    var minutes = (seconds - secondsPart) / 60;
    return `${minutes}:${secondsPart}`;
}
class Timer{
    constructor(cb){
        this.ellapsedSeconds = 0;
        this.t = null;
        this.cb = cb;
        this.paused = null;
    }
    
    go(){
        this.paused = false;
        this.t = setInterval(() => {
            !this.paused && this.cb(++this.ellapsedSeconds);
        }, 1000);
    }
    pause(){
        this.paused = true;
    }
    resume(){
        this.paused = false;
    }
    reset(){
        clearInterval(this.t);
        this.t = null;
        this.paused = null;
      
        this.ellapsedSeconds = 0;
    }
    isInProgress(){
        return this.t != null;
    }
}
var PCStates = {
    ready: 'r',
    sip: 's',
    bip: 'b',
    sp: 'sp',
    bp: 'bp'
}
class PomodoroClock{
    constructor(opts){
        this.stateChangedCallback = opts.statechangedCallback;
        this.sessionMinutes = opts.sessionMinutes || 25;
        this.breakMinutes = opts.breakMinutes || 5;

        this.sessionTimer = new Timer((ellapsedSessionSeconds) => {
            if(ellapsedSessionSeconds / 60 >= this.sessionMinutes){
                this.sessionTimer.reset();
                this.breakTimer.go();
                this.setState(PCStates.bip);  
            }
            else{
                var remainingSeconds = (this.sessionMinutes * 60) - ellapsedSessionSeconds;
                var remainingMinutes = secondToMMSS(remainingSeconds);
                opts.sessionMinutesChangedCallback(remainingMinutes);
            }
        });
        this.breakTimer = new Timer((ellapsedBreakSeconds) => {
            if(ellapsedBreakSeconds / 60 >= this.breakMinutes){
                this.breakTimer.reset();
                this.sessionTimer.go();
                this.setState(PCStates.sip);
            }
            else{
                var remainingSeconds = (this.breakMinutes * 60) - ellapsedBreakSeconds;
                var remainingMinutes = secondToMMSS(remainingSeconds);
                opts.breakMinutesChangedCallback(remainingMinutes);
            }
        });
        this.setState(PCStates.ready);
    }

    setState(stateChar){
        this.presentState = stateChar;
        this.stateChangedCallback(this.presentState);
    }
    go(){
        this.sessionTimer.go();
        this.setState(PCStates.sip);        
    }
    pause(){
          if(this.sessionTimer.isInProgress()){
              this.sessionTimer.pause();
              this.setState(PCStates.sp);
          }
          else if(this.breakTimer.isInProgress()){
              this.breakTimer.pause();
              this.setState(PCStates.bp);
          }
    }
    resume(){
          if(this.sessionTimer.isInProgress()){
              this.sessionTimer.resume();
              this.setState(PCStates.sip);
          }
          else if(this.breakTimer.isInProgress()){
              this.breakTimer.resume();
              this.setState(PCStates.bip);
          }
    }
    reset(){
        this.sessionTimer.reset();
        this.breakTimer.reset();
        this.setState(PCStates.ready);
    }
}