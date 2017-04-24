var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PCStates = {
    ready: 'r',
    sip: 's',
    bip: 'b',
    sp: 'sp',
    bp: 'bp'
};
var secondToMMSS = function secondToMMSS(seconds) {
    var secondsPart = seconds % 60;
    var minutes = (seconds - secondsPart) / 60;
    return minutes + ':' + secondsPart;
};

var PomodoroClock = function () {
    function PomodoroClock(opts) {
        var _this = this;

        _classCallCheck(this, PomodoroClock);

        this.stateChangedCallback = opts.statechangedCallback;
        this.sessionMinutes = opts.sessionMinutes || 25;
        this.breakMinutes = opts.breakMinutes || 5;

        this.sessionTimer = new Timer(function (ellapsedSessionSeconds) {
            if (ellapsedSessionSeconds / 60 >= _this.sessionMinutes) {
                _this.sessionTimer.reset();
                _this.breakTimer.go();
                _this.setState(PCStates.bip);
            } else {
                var remainingSeconds = _this.sessionMinutes * 60 - ellapsedSessionSeconds;
                var remainingMinutes = secondToMMSS(remainingSeconds);
                opts.sessionMinutesChangedCallback(remainingMinutes);
            }
        });
        this.breakTimer = new Timer(function (ellapsedBreakSeconds) {
            if (ellapsedBreakSeconds / 60 >= _this.breakMinutes) {
                _this.breakTimer.reset();
                _this.sessionTimer.go();
                _this.setState(PCStates.sip);
            } else {
                var remainingSeconds = _this.breakMinutes * 60 - ellapsedBreakSeconds;
                var remainingMinutes = secondToMMSS(remainingSeconds);
                opts.breakMinutesChangedCallback(remainingMinutes);
            }
        });
        this.setState(PCStates.ready);
    }

    _createClass(PomodoroClock, [{
        key: 'setState',
        value: function setState(stateChar) {
            this.presentState = stateChar;
            this.stateChangedCallback(this.presentState);
        }
    }, {
        key: 'go',
        value: function go() {
            this.sessionTimer.go();
            this.setState(PCStates.sip);
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (this.sessionTimer.isInProgress()) {
                this.sessionTimer.pause();
                this.setState(PCStates.sp);
            } else if (this.breakTimer.isInProgress()) {
                this.breakTimer.pause();
                this.setState(PCStates.bp);
            }
        }
    }, {
        key: 'resume',
        value: function resume() {
            if (this.sessionTimer.isInProgress()) {
                this.sessionTimer.resume();
                this.setState(PCStates.sip);
            } else if (this.breakTimer.isInProgress()) {
                this.breakTimer.resume();
                this.setState(PCStates.bip);
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.sessionTimer.reset();
            this.breakTimer.reset();
            this.setState(PCStates.ready);
        }
    }]);

    return PomodoroClock;
}();