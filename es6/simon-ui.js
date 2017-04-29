$(document).ready(function(){
    var rf = function(blockId, cb){
        return function(){
            $(blockId).fadeOut("slow", function(){
                $(blockId).fadeIn("slow", cb);
            });
        }
    }
    

    var visualize = function(lp){
        var f = function(){};
        for(var j = lp.length - 1; j >= 0; j--){
            var currentBlockId = `#block${lp[j] + 1}`;
            f = rf(currentBlockId, f);
        }
        f();
    }

    var currentPattern;

    var gameOpts = {
        stateChangedCallback: function(state, lastPattern){
            currentPattern = [];
            switch(state){
                case SimonStates.fresh:                    
                    console.log('fresh game started');
                    break;
                case SimonStates.retry:
                    visualize(lastPattern);
                    console.log('retry');
                    break;
                case SimonStates.won:
                    console.log('won');                    
                    break;
                case SimonStates.lost:
                    console.log('lost');
                    break;
                case SimonStates.nextPatternAdded:
                    console.log(lastPattern);
                    visualize(lastPattern);
                    console.log('next pattern added');
                    break;
            }            
        }
    }
    var game = new Simon(gameOpts);

    

    var updateCurrentPattern = function(n){
        currentPattern.push(n);
        if(currentPattern.length == game.count){
            game.submitPattern(currentPattern);
        }
    }



    $("#block1").click(function(){
        updateCurrentPattern(0);
    });
    $("#block2").click(function(){
        updateCurrentPattern(1);
    })
    $("#block3").click(function(){
        updateCurrentPattern(2);
    })
    $("#block4").click(function(){
        updateCurrentPattern(3);
    })
})
