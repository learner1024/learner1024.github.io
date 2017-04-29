var SimonStates = {
    fresh: 'f',
    won: 'w',
    lost: 'l',
    nextPatternAdded: 'n',
    retry: 'r'

}
var SimonDifficulties = {
    easy: 1,
    normal: 2,
    hard: 3
}

var RandomNumberUtils = {
    GenerateRandomNumberBetweenMinMax(min, max){
        var totalPossibilities = max - min + 1;
        var randomNum = Math.random();
        var ranges = 1 / totalPossibilities;
        for (var i = 0; i < totalPossibilities; i++){
            if(randomNum < ranges * (i + 1)){
                return min + i;
            }
        }
    }
}
class Simon{
    constructor(opts){
        this.retryEnabled = opts.retryEnabled || true;
        this.difficulty = opts.difficulty || SimonDifficulties.easy;
        this.stateChangedCallback = opts.stateChangedCallback;
        this.setState(SimonStates.fresh);
    }

    get lastPattern(){
        return this.patterns[this.patterns.length - 1];
    }

    get count(){
        return this.patterns.length;
    }


    generateNextPattern(){
        var nextPattern = [RandomNumberUtils.GenerateRandomNumberBetweenMinMax(0,3)];
        if(this.patterns.length > 0){
            nextPattern = this.lastPattern.concat(nextPattern);
        }
        this.patterns.push(nextPattern);
        this.setState(SimonStates.nextPatternAdded);
    }

    submitPattern(pattern){
        var ret = false;
        if(pattern.length == this.lastPattern.length){
            ret = pattern.every((e, i) => {
                return this.lastPattern[i] === e;
            })
        }
        if(ret == false){
            if(this.retryEnabled == true){
                this.setState(SimonStates.retry);
            }
            else{
                this.setState(SimonStates.lost);
            }
            
        }
        else{
            if(this.patterns.length == this.difficulty * 10){
                this.setState(SimonStates.won);
            }
            else{
                this.generateNextPattern();
            }
        }
    }

    setState(newState){
        var prevState = this.state;
        this.state = newState;
        switch(newState){
            case SimonStates.fresh:
                this.patterns = [];
                this.stateChangedCallback(SimonStates.fresh);
                this.generateNextPattern();
                break;
            case SimonStates.retry:
                this.stateChangedCallback(SimonStates.retry, this.lastPattern);
                break;
            case SimonStates.won:
                this.stateChangedCallback(SimonStates.won);
                break;
            case SimonStates.lost:
                this.stateChangedCallback(SimonStates.lost);
                break;
            case SimonStates.nextPatternAdded:
                this.stateChangedCallback(SimonStates.nextPatternAdded, this.lastPattern, this.patterns.length);
                break;
            default:
                this.setState(prevState); 
        }
    }
}