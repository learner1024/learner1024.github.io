var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimonStates = {
    fresh: 'f',
    won: 'w',
    lost: 'l',
    nextPatternAdded: 'n'

};
var Difficulties = {
    easy: 1,
    normal: 2,
    hard: 3
};

var RandomNumberUtils = {
    GenerateRandomNumberBetweenMinMax: function GenerateRandomNumberBetweenMinMax(min, max) {
        var totalPossibilities = max - min + 1;
        var randomNum = Math.random();
        var ranges = 1 / totalPossibilities;
        for (var i = 0; i < totalPossibilities; i++) {
            if (randomNum < ranges * (i + 1)) {
                return min + i;
            }
        }
    }
};

var Simon = function () {
    function Simon(opts) {
        _classCallCheck(this, Simon);

        this.difficulty = opts.difficulty || Difficulties.normal;
        this.stateChangedCallback = opts.stateChangedCallback;
        this.setState(SimonStates.fresh);
    }

    _createClass(Simon, [{
        key: 'generateNextPattern',
        value: function generateNextPattern() {
            var nextPattern = [RandomNumberUtils.generateRandomNumberBetweenMinMax(0, 3)];
            if (this.patterns.length > 0) {
                nextPattern = this.patterns[this.patterns.length - 1].concat(nextPattern);
            }
            this.patterns.push(nextPattern);
            this.setState(SimonStates.nextPatternAdded);
        }
    }, {
        key: 'submitPattern',
        value: function submitPattern(pattern) {
            var ret = false;
            var lastPattern = this.patterns[this.patterns.length - 1];
            if (pattern.length == lastPattern.length) {
                ret = pattern.every(function (e, i) {
                    return lastPattern[i] === e;
                });
            }
            if (ret == false) {
                this.setState(SimonStates.lost);
            } else {
                if (this.patterns.length == this.difficulty * 10) {
                    this.setState(SimonStates.won);
                } else {
                    this.generateNextPattern();
                }
            }
        }
    }, {
        key: 'setState',
        value: function setState(newState) {
            var prevState = this.state;
            this.state = newState;
            switch (newState) {
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
    }]);

    return Simon;
}();