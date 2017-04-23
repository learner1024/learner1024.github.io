var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
    function Timer(cb) {
        _classCallCheck(this, Timer);

        this.ellapsedSeconds = 0;
        this.t = null;
        this.cb = cb;
        this.paused = null;
    }

    _createClass(Timer, [{
        key: "go",
        value: function go() {
            var _this = this;

            this.paused = false;
            this.t = setInterval(function () {
                !_this.paused && _this.cb(++_this.ellapsedSeconds);
            }, 1000);
        }
    }, {
        key: "pause",
        value: function pause() {
            this.paused = true;
        }
    }, {
        key: "reset",
        value: function reset() {
            clearInterval(this.t);
            this.t = null;
            this.paused = null;
            this.ellapsedSeconds = 0;
        }
    }]);

    return Timer;
}();

var PomodoroClock = function () {
    function PomodoroClock(opts) {
        var _this2 = this;

        _classCallCheck(this, PomodoroClock);

        this.sessionMinutes = opts.sessionMinutes || 25;
        this.breakMinutes = opts.breakMinutes || 5;

        this.sessionTimer = new Timer(function (ellapsedSessionSeconds) {
            if (ellapsedSessionSeconds / 60 > _this2.sessionMinutes) {
                _this2.sessionTimer.reset();
                _this2.breakTimer.go();
            } else {
                var remainingSeconds = _this2.sessionMinutes * 60 - ellapsedSessionSeconds;
                var remainingMinutes = remainingSeconds - remainingSeconds % 60 + ":" + remainingSeconds % 60;
                opts.sessionMinutesChangedCallback(remainingMinutes);
            }
        });
        this.breakTimer = new Timer(function (ellapsedBreakSeconds) {
            if (ellapsedBreakSeconds / 60 > _this2.breakMinutes) {
                _this2.breakTimer.reset();
                _this2.sessionTimer.go();
            } else {
                var remainingSeconds = _this2.breakMinutes * 60 - ellapsedBreakSeconds;
                var remainingMinutes = remainingSeconds - remainingSeconds % 60 + ":" + remainingSeconds % 60;
                opts.breakMinutesChangedCallback(remainingMinutes);
            }
        });
    }

    _createClass(PomodoroClock, [{
        key: "go",
        value: function go() {
            this.sessionTimer.go();
        }
    }]);

    return PomodoroClock;
}();