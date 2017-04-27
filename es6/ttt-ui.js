$(document).ready(function(){
    var nextChar = '';
    var gameOpts = {
        userChar: 'both',
        stateChangedCallback: function(state){
            switch(state){
                case TicTacToeStates.fresh:  
                    break;
                case TicTacToeStates.won1:
                    alert('player1 won');
                    break;
                case TicTacToeStates.won2:
                    alert('player2 won');
                    break;
                case TicTacToeStates.draw: 
                    alert('there was draw');
                    break;
                case TicTacToeStates.inprogress1:
                    alert('player 1\'s turn ');
                    nextChar = 'X';
                    break;
                case TicTacToeStates.inprogress2:                
                    alert('player 2\'s turn ');
                    nextChar = 'O';
                    break;
            }
        }
    }
    var game = new TicTacToe(gameOpts);
    
    
    

    $("#i0").click(function(){
        $("#i0").text(nextChar);
        game.update(0, nextChar);
    });
    $("#i1").click(function(){
        $("#i1").text(nextChar);
        game.update(1, nextChar);
    });
    $("#i2").click(function(){
        $("#i2").text(nextChar);
        game.update(3, nextChar);
    });
    $("#i3").click(function(){
        $("#i3").text(nextChar);
        game.update(3, nextChar);
    });
    $("#i4").click(function(){
        $("#i4").text(nextChar);
        game.update(4, nextChar);
    });
    $("#i5").click(function(){
        $("#i5").text(nextChar);
        game.update(5, nextChar);
    });
    $("#i6").click(function(){
        $("#i6").text(nextChar);
        game.update(6, nextChar);
    });
    $("#i7").click(function(){
        $("#i7").text(nextChar);
        game.update(7, nextChar);
    });
    $("#i8").click(function(){
        $("#i8").text(nextChar);
        game.update(8, nextChar);
    });

    
    
})
