var SimonStates = {
    fresh: 'f',
    won: 'w',
    lost: 'l',
    nextPatternAdded: 'n',

}
var Difficulties = {
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
        this.difficulty = opts.difficulty || Difficulties.normal;
        this.stateChangedCallback = opts.stateChangedCallback;
        this.setState(SimonStates.fresh);
    }


    generateNextPattern(){
        var nextPattern = [RandomNumberUtils.generateRandomNumberBetweenMinMax(0,3)];
        if(this.patterns.length > 0){
            nextPattern = this.patterns[this.patterns.length - 1].concat(nextPattern);
        }
        this.patterns.push(nextPattern);
        this.setState(SimonStates.nextPatternAdded);
    }

    submitPattern(pattern){
        var ret = false;
        var lastPattern = this.patterns[this.patterns.length - 1];
        if(pattern.length == lastPattern.length){
            ret = pattern.every((e, i) => {
                return lastPattern[i] === e;
            })
        }
        if(ret == false){
            this.setState(SimonStates.lost)
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
                break;
            case SimonStates.won:
                this.stateChangedCallback(SimonStates.won);
                break;
            case SimonStates.lost:
                this.stateChangedCallback(SimonStates.lost);
                break;
            case SimonStates.nextPatternAdded:
                this.stateChangedCallback(SimonStates.nextPatternAdded);
                break;
            default:
                this.setState(prevState); 
        }
    }
}