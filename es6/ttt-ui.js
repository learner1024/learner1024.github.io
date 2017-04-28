$(document).ready(function(){
    var nextChar = '', game;
    var gameOpts = {
        stateChangedCallback: function(state, arr){
            arr.forEach(function(e, i){
                $(`#i${i}`).text(e);
            });
            switch(state){
                case TicTacToeStates.fresh:                    
                    break;
                case TicTacToeStates.won1:
                    console.log('player1 - won')
                    break;
                case TicTacToeStates.won2:
                    console.log('player2 - won');
                    break;
                case TicTacToeStates.draw: 
                    console.log('there was draw');
                    break;
                case TicTacToeStates.inprogress1:
                    console.log('player 1\'s turn ');
                    nextChar = 'X';
                    break;
                case TicTacToeStates.inprogress2:                
                    console.log('player 2\'s turn ');
                    nextChar = 'O';
                    break;
            }            
        }
        
    }    
    
    $("#btnNewGame").click(function(){
        game = new TicTacToe(gameOpts);
    });
    
    

    $("#i0").click(function(){
        game.update(0, nextChar);      
    });
    $("#i1").click(function(){
        game.update(1, nextChar);     
    });
    $("#i2").click(function(){
        game.update(2, nextChar);      
    });
    $("#i3").click(function(){
        game.update(3, nextChar);        
    });
    $("#i4").click(function(){
        game.update(4, nextChar);      
    });
    $("#i5").click(function(){
        game.update(5, nextChar);       
    });
    $("#i6").click(function(){
        game.update(6, nextChar);     
    });
    $("#i7").click(function(){
        game.update(7, nextChar);      
    });
    $("#i8").click(function(){
        game.update(8, nextChar);       
    });

    $("#btnNewGame").click();
})
