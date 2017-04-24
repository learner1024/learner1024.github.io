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