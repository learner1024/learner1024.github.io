$(document).ready(function(){

    $("#toggleStrict").bootstrapToggle({
      on: 'Strict',
      off: 'Easy'
    });

   

    var animationInProgress = false;
    
    var rf = function(blockId, cb){
        return function(){
            $(blockId).fadeOut("slow", function(){
                $(blockId).fadeIn("slow", cb);
            });
        }
    }
    

    var visualize = function(lp){
        animationInProgress = true;
        var f = function(){
            animationInProgress = false;
        };
        for(var j = lp.length - 1; j >= 0; j--){
            var currentBlockId = `#block${lp[j] + 1}`;
            f = rf(currentBlockId, f);
        }
        f();
    }

    var currentPattern;

    var gameOpts = {
        retryEnabled : true,
        stateChangedCallback: function(state, lastPattern, count){
            currentPattern = [];
            switch(state){
                case SimonStates.fresh: 
                    $("#count").text(0);       
                    $("#count").removeClass("hide");       
                    $("#result").addClass("hide");                   
                    $("#btnStop").removeClass("hide");
                    $("#btnNew").addClass("hide");
                    $(".toggle").addClass("hide");
                    
                    console.log('fresh game started');
                    break;
                case SimonStates.retry:     
                    $("#result").text("retry");
                    visualize(lastPattern);
                    console.log('retry');
                    break;
                case SimonStates.won:
                    $("#count").addClass("hide"); 
                    $("#result").removeClass("hide");
                    $("#result").text("won");
                    console.log('won');                    
                    break;
                case SimonStates.lost:
                    $("#count").addClass("hide"); 
                    $("#result").removeClass("hide");
                    $("#result").text("lost");
                    console.log('lost');
                    break;
                case SimonStates.nextPatternAdded:
                    $("#count").text(count);
                    console.log(lastPattern);
                    visualize(lastPattern);
                    console.log('next pattern added');
                    break;
            }            
        }
    }
    var game;
    
    var updateCurrentPattern = function(n){
        if(game != null && animationInProgress == false){
            console.log(n);
            currentPattern.push(n);
            if(currentPattern.length == game.count){
                game.submitPattern(currentPattern);
            }
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

    $("#btnNew").click(function(){
        game = new Simon(gameOpts);
        
    });
    $("#btnStop").click(function(){
        game = null;
        $("#btnNew").removeClass("hide");
        $(".toggle").removeClass("hide");
        $("#btnStop").addClass("hide");
        $("#count").text(0);
        $("#count").addClass("hide");
        $("#result").text("");

    });

    $('#toggleStrict').change(function() {
        gameOpts.retryEnabled = !$(this).prop('checked');
    })
})
