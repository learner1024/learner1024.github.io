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
            !this.paused && this.cb(++(this.ellapsedSeconds));
        }, 1000);
    }
    pause(){
        this.paused = true;
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

class PomodoroClock{
    constructor(opts){
        this.sessionMinutes = opts.sessionMinutes || 25;
        this.breakMinutes = opts.breakMinutes || 5;

        this.sessionTimer = new Timer((ellapsedSessionSeconds) => {
            if(ellapsedSessionSeconds / 60 >= this.sessionMinutes){
                this.sessionTimer.reset();
                this.breakTimer.go();
            }
            else{
                var remainingSeconds = (this.sessionMinutes * 60) - ellapsedSessionSeconds;
                var remainingMinutes = `${remainingSeconds - (remainingSeconds % 60)}:${remainingSeconds % 60}`;
                opts.sessionMinutesChangedCallback(remainingMinutes);
            }
        });
        this.breakTimer = new Timer((ellapsedBreakSeconds) => {
            if(ellapsedBreakSeconds / 60 >= this.breakMinutes){
                this.breakTimer.reset();
                this.sessionTimer.go();
            }
            else{
                var remainingSeconds = (this.breakMinutes * 60) - ellapsedBreakSeconds;
                var remainingMinutes = `${remainingSeconds - (remainingSeconds % 60)}:${remainingSeconds % 60}`;
                opts.breakMinutesChangedCallback(remainingMinutes);
            }
        });
    }

    go(){
        this.sessionTimer.go();
    }
}