var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

TicTacToeStates = {
    fresh: 'f',
    won1: 'w1',
    won2: 'w2',
    draw: 'd',
    inprogress1: 'p1',
    inprogress2: 'p2'
};
TicTacToeMatches = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

var TicTacToe = function () {
    function TicTacToe(opts) {
        _classCallCheck(this, TicTacToe);

        this.player1 = {
            char: 'X',
            isComputer: opts.userChar && opts.userChar == 'O'
        };
        this.player2 = {
            char: 'O',
            isComputer: opts.userChar && opts.userChar == 'X'
        };

        this.stateChangedCallback = opts.stateChangedCallback;

        this.setState(TicTacToeStates.fresh);
    }

    _createClass(TicTacToe, [{
        key: 'toggleTurns',
        value: function toggleTurns() {
            var newState = this.state == TicTacToeStates.inprogress1 ? TicTacToeStates.inprogress2 : TicTacToeStates.inprogress1;
            this.setState(newState);
        }
    }, {
        key: 'makeNextMove',
        value: function makeNextMove() {
            var _this = this;

            var myChar, oppChar;
            if (this.state == TicTacToeStates.inprogress1) {
                myChar = this.player1.char;
                oppChar = this.player2.char;
            } else if (this.state == TicTacToeStates.inprogress2) {
                myChar = this.player2.char;
                oppChar = this.player1.char;
            } else {
                throw new Error('makeNextMove was called when state was neither inprogress1 nor inprogress2');
            }

            var dec = TicTacToeMatches.map(function (m) {
                var myCharCount = 0,
                    myCharIndices = [];
                var oppCharCount = 0,
                    oppCharIndices = [];
                var emptyCharCount = 0,
                    emptyCharIndices = [];
                m.forEach(function (ci) {
                    if (_this.arr[ci] == '') {
                        ++emptyCharCount;
                        emptyCharIndices.push(ci);
                    }
                    if (_this.arr[ci] == oppChar) {
                        ++oppCharCount;
                        oppCharIndices.push(ci);
                    };
                    if (_this.arr[ci] == myChar) {
                        ++myCharCount;
                        myCharIndices.push(ci);
                    };
                });

                return {
                    m: m,
                    myCharCount: myCharCount,
                    myCharIndices: myCharIndices,
                    oppCharCount: oppCharCount,
                    oppCharIndices: oppCharIndices,
                    emptyCharCount: emptyCharCount,
                    emptyCharIndices: emptyCharIndices
                };
            });

            //finished building decesion object

            var loc;

            //check if current player has winning move already
            var myWinners = dec.filter(function (d) {
                return d.myCharCount == 2 && d.emptyCharCount == 1;
            });
            if (myWinners.length > 0) {
                //make a winning move
                loc = myWinners[0].emptyCharIndices[0];
            } else {
                //current player does not have a winning move
                //so lets check if opponents next move is winning move
                var oppWinners = dec.filter(function (d) {
                    return d.oppCharCount == 2 && d.emptyCharCount == 1;
                });
                if (oppWinners.length > 0) {
                    //if length is more than 1, current player is going to lose any way
                    loc = oppWinners[0].emptyCharIndices[0];
                } else {
                    //opponent possible winners / my possible winners
                    var myPossibleWinners = dec.filter(function (d) {
                        return d.myCharCount == 1 && d.emptyCharCount > 0;
                    });
                    if (myPossibleWinners.length > 0) {
                        loc = myPossibleWinners[0].emptyCharIndices[0];
                    } else {
                        var oppPossibleWinners = dec.filter(function (d) {
                            return d.oppCharCount == 1 && d.emptyCharCount > 0;
                        });
                        if (oppPossibleWinners.length > 0) {
                            loc = oppPossibleWinners[0].emptyCharIndices[0];
                        } else {
                            //this is first turn, all empty, do it anywhere
                            loc = 0;
                        }
                    }
                }
            }
            this.update(loc, myChar);
        }
    }, {
        key: 'setState',
        value: function setState(newState) {
            var prevState = this.state;
            this.state = newState;
            switch (newState) {
                case TicTacToeStates.fresh:
                    this.arr = ['', '', '', '', '', '', '', '', ''];
                    this.stateChangedCallback(TicTacToeStates.fresh, this.arr);
                    //its a fresh game, randomly decide who should start this game
                    if (Math.random() > 0.5) {
                        this.setState(TicTacToeStates.inprogress1);
                    } else {
                        this.setState(TicTacToeStates.inprogress2);
                    }
                    break;
                case TicTacToeStates.won1:
                    this.stateChangedCallback(TicTacToeStates.won1, this.arr);
                    this.setState(TicTacToeStates.fresh);
                    //notify player1 won and start fresh game
                    break;
                case TicTacToeStates.won2:
                    this.stateChangedCallback(TicTacToeStates.won2, this.arr);
                    this.setState(TicTacToeStates.fresh);
                    //notify player1 won and start fresh game
                    break;
                case TicTacToeStates.draw:
                    this.stateChangedCallback(TicTacToeStates.draw, this.arr);
                    this.setState(TicTacToeStates.fresh);
                    //notify user draw and start fresh game
                    break;
                case TicTacToeStates.inprogress1:
                    if (this.player1.isComputer) {
                        this.makeNextMove();
                    } else {
                        this.stateChangedCallback(TicTacToeStates.inprogress1, this.arr);
                    }

                    break;
                case TicTacToeStates.inprogress2:
                    if (this.player2.isComputer) {
                        this.makeNextMove();
                    } else {
                        this.stateChangedCallback(TicTacToeStates.inprogress2, this.arr);
                    }
                    break;
                default:
                    this.state = prevState;
            }
        }
    }, {
        key: 'update',
        value: function update(location) {
            var _this2 = this;

            var char, wonState;
            if (this.state == TicTacToeStates.inprogress1) {
                char = this.player1.char;
                wonState = TicTacToeStates.won1;
            } else if (this.state == TicTacToeStates.inprogress2) {
                char = this.player2.char;
                wonState = TicTacToeStates.won2;
            } else {
                throw new Error('update can be called only when state is inprogress1 or inprogress2');
            }

            if (this.arr[location] === '') {
                this.arr[location] = char;

                //lets see if this move has caused current player to win game
                var allMatches = TicTacToeMatches.filter(function (m) {
                    return m.indexOf(location) != -1;
                });
                var matchNotFound = allMatches.every(function (am) {
                    if (_this2.arr[am[0]] == _this2.arr[am[1]] && _this2.arr[am[1]] == _this2.arr[am[2]]) {
                        //match found, current player wins the game
                        _this2.setState(wonState);
                        return false;
                    } else {
                        return true;
                    }
                });

                if (matchNotFound) {
                    //if no more moves possible, game can be called as draw
                    if (this.arr.indexOf('') == -1) {
                        //no more moves possible, 
                        this.setState(TicTacToeStates.draw);
                    } else {
                        this.toggleTurns();
                    }
                }
            } else {
                throw new Error('you can not put ' + char + ' at this location');
            }
        }
    }]);

    return TicTacToe;
}();