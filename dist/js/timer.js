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
        key: "resume",
        value: function resume() {
            this.paused = false;
        }
    }, {
        key: "reset",
        value: function reset() {
            clearInterval(this.t);
            this.t = null;
            this.paused = null;

            this.ellapsedSeconds = 0;
        }
    }, {
        key: "isInProgress",
        value: function isInProgress() {
            return this.t != null;
        }
    }]);

    return Timer;
}();