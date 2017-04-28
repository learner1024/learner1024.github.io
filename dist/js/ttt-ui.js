$(document).ready(function () {
    var game;
    var gameOpts = {
        userChar: 'X',
        stateChangedCallback: function stateChangedCallback(state, arr) {
            arr.forEach(function (e, i) {
                $('#i' + i).text(e);
            });
            switch (state) {
                case TicTacToeStates.fresh:
                    console.log('fresh game started');
                    break;
                case TicTacToeStates.won1:
                    console.log('player1 - won');
                    break;
                case TicTacToeStates.won2:
                    console.log('player2 - won');
                    break;
                case TicTacToeStates.draw:
                    console.log('there was draw');
                    break;
                case TicTacToeStates.inprogress1:
                    console.log('player 1\'s turn ');
                    break;
                case TicTacToeStates.inprogress2:
                    console.log('player 2\'s turn ');
                    break;
            }
        }

    };

    $("#btnNewGame").click(function () {
        game = new TicTacToe(gameOpts);
    });
    $("#btnNewGame").click();

    $("#i0").click(function () {
        game.update(0);
    });
    $("#i1").click(function () {
        game.update(1);
    });
    $("#i2").click(function () {
        game.update(2);
    });
    $("#i3").click(function () {
        game.update(3);
    });
    $("#i4").click(function () {
        game.update(4);
    });
    $("#i5").click(function () {
        game.update(5);
    });
    $("#i6").click(function () {
        game.update(6);
    });
    $("#i7").click(function () {
        game.update(7);
    });
    $("#i8").click(function () {
        game.update(8);
    });
});