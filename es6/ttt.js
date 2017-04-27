TicTacToeStates = {
    fresh: 'f',
    won1: 'w1',
    won2: 'w2',
    draw: 'd',
    inprogress1: 'p1',
    inprogress2: 'p2'
}
TicTacToeMatches = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
class TicTacToe{
    constructor(opts){
        this.player1 = {
            char: 'X',
            isComputer: opts.userChar && opts.userChar == 'O'
        };
        this.player2 = {
            char: 'O',
            isComputer: opts.userChar && opts.userChar == 'X'
        }

        this.setState(TicTacToeStates.fresh);
    }
    toggleTurns(){
        var newState = this.state == TicTacToeStates.inprogress1 ? TicTacToeStates.inprogress2 : TicTacToeStates.inprogress1;
        this.setState(newState);
    }
    makeNextMove(){
        var myChar, oppChar;        
        if(this.state == TicTacToeStates.inprogress1){
            myChar = this.player1.char;
            oppChar = this.player2.char;
        }
        else if(this.state == TicTacToeStates.inprogress2){
            myChar = this.player2.char;
            oppChar = this.player1.char;
        }

        //prevent opponent winning
        //if there is a row in match that has opponentchar count 2
        var dec = TicTacToeMatches.map((m) => {
            var myCharCount = 0, myCharIndices = [];
            var oppCharCount = 0, oppCharIndices = [];
            var emptyCharCount = 0, emptyCharIndices = [];
            m.forEach(function(ci){
                if(this.arr[ci] == '') {
                    ++emptyCharCount;
                    emptyCharIndices.push(ci);
                }
                if(this.arr[ci] == oppChar) {
                    ++oppCharCount;
                    oppCharIndices.push(ci);
                };
                if(this.arr[ci] == myChar) {
                    ++myCharCount;
                    myCharIndices.push(ci);
                };
            })

            return {
                m: m,
                myCharCount: myCharCount,
                myCharIndices: [],
                oppCharCount: oppCharCount,
                oppCharIndices: [],
                emptyCharCount: emptyCharCount,
                emptyCharIndices: []
            };
        });


        var loc;

        var oppWinners = dec.filter((d) => {
            return d.oppCharCount == 2 && d.emptyCharCount == 1;
        });

        if(oppWinners.length > 0){
            loc = oppWinners[0].emptyCharIndices[0];
        }
        else{
            var myWinners = dec.filter((d) => {
                return d.myCharCount == 2 && d.emptyCharCount == 1;
            });
            if(myWinners.length > 0){
                loc = myWinners[0].emptyCharIndices[0];
            }
            else{
                var myPossibleWinners = dec.filter((d) => {
                    return d.myCharCount == 1 && d.emptyCharCount > 0
                });
                if(myPossibleWinners.length > 0){
                    loc = myPossibleWinners[0].emptyCharIndices[0];
                }
                else{
                    var oppPossibleWinners = dec.filter((d) => {
                        return d.oppCharCount == 1 && d.emptyCharCount > 0
                    });
                    if(oppPossibleWinners.length > 0){
                        loc = oppPossibleWinners[0].emptyCharIndices[0];
                    }
                    else{
                        //this is first turn, all empty, do it anywhere
                        loc = 0;
                    }
                }
            }
        }
        this.update(loc, myChar);        
    }
    setState(newState){
        var prevState = this.state;
        this.state = newState;
        switch(newState){
            case TicTacToeStates.fresh:
                this.arr = ['', '', '', '', '', '', '', '', ''];
                //its a fresh game, randomly decide who should start this game
                if(Math.random() > 0.5){
                    this.setState(TicTacToeStates.inprogress1);
                }
                else{
                    this.setState(TicTacToeStates.inprogress2);
                }
                break;
            case TicTacToeStates.won1:
                //notify player1 won and start fresh game
                break;
            case TicTacToeStates.won2:  
                //notify player1 won and start fresh game
                break;
            case TicTacToeStates.draw:
                //notify user draw and start fresh game
                break;
            case TicTacToeStates.inprogress1:
                if(this.player1.isComputer){
                    this.makeNextMove();
                }
                else{
                    //notify user and wait for input
                }

                break;
            case TicTacToeStates.inprogress2:
                if(this.player2.isComputer){
                    this.makeNextMove();
                }
                else{
                    //notify user and wait for input
                }
                break;
            default:
                this.state = prevState;
        }
    }
    update(location, char){
        if(this.arr[location] === ''){
            this.arr[location] = char;

            //lets see if this move has caused current player to win game
            var allMatches = TicTacToeMatches.filter(function(m){
                return m.indexOf(location) != -1;
            })
            var matchNotFound = allMatches.every((am) => {
                if(this.arr[am[0]] == this.arr[am[1]] && this.arr[am[1]] == this.arr[am[2]]){
                    //match found, current player wins the game
                    if(this.state == TicTacToeStates.inprogress1){
                        this.setState(TicTacToeStates.won1);
                    }
                    else if (this.state == TicTacToeStates.inprogress2){
                        this.setState(TicTacToeStates.won2);
                    }
                    else{
                        //real problem here
                        throw new Error("game won when state was neither inprogress1 nor inprogress2")
                    }
                    return false;
                }
                else{
                    return true;
                }
            });

            if(matchNotFound){
                //if no more moves possible, game can be called as draw
                if(this.arr.indexOf('') == -1){
                    //no more moves possible, 
                    this.setState(TicTacToeStates.draw);
                }
                else{
                    this.toggleTurns();
                }
            }


        }
        else{
            throw new Error(`you can not put ${char} at this location`);
        }
    }
    update1(location){
        this.update(location, this.player1.char);
    }
    update2(location){
        this.update(location, this.player2.char);
    }
}