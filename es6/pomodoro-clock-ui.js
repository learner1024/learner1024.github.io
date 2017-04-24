$(document).ready(function(){
    var onTimerChanged = function(remainingMinutes){
        $("#timerDisplay").text(remainingMinutes)  
    }
    var onPCStateChanged = function(changedState){
        switch(changedState){
            case PCStates.ready:
                $("#timerDisplay").text(`${pcOpts.sessionMinutes}:00`);
                $("#breakMinutes").text(pcOpts.breakMinutes);
                $("#sessionMinutes").text(pcOpts.sessionMinutes);
                $("#presentState").text("Session");
                
                $("#start").removeClass("hide");
                $("#pause").addClass("hide");
                $("#resume").addClass("hide");
                $("#term").addClass("hide");
                $("#configSession button").removeClass("hide");
                $("#configBreak button").removeClass("hide");
                break;
            case PCStates.sip:
                $("#presentState").text("Session");
                $("#start").addClass("hide");
                $("#pause").removeClass("hide");
                $("#resume").addClass("hide");
                $("#term").removeClass("hide");
                $("#configSession button").addClass("hide");
                $("#configBreak button").addClass("hide");
                break;
            case PCStates.bip:
                $("#presentState").text("Break");
                $("#start").addClass("hide");
                $("#pause").removeClass("hide");
                $("#resume").addClass("hide");
                $("#term").removeClass("hide");
                $("#configSession button").addClass("hide");
                $("#configBreak button").addClass("hide");
                break;
            case PCStates.sp: 
                $("#presentState").text("Paused");
                $("#start").addClass("hide");
                $("#pause").addClass("hide");
                $("#resume").removeClass("hide");
                $("#term").removeClass("hide");
                $("#configSession button").addClass("hide");
                $("#configBreak button").addClass("hide");
                break;
            case PCStates.bp:
                $("#presentState").text("Paused");
                $("#presentState").text("Paused");
                $("#start").addClass("hide");
                $("#pause").addClass("hide");
                $("#resume").removeClass("hide");
                $("#term").removeClass("hide");
                $("#configSession button").addClass("hide");
                $("#configBreak button").addClass("hide");
                break;
            
        }
    }
    var pcOpts = {
        sessionMinutes: 25,
        breakMinutes: 5,
        sessionMinutesChangedCallback: onTimerChanged,
        breakMinutesChangedCallback: onTimerChanged,
        statechangedCallback : onPCStateChanged
    };

    
    
    

    var pc = new PomodoroClock(pcOpts);
    
    $("#start").click(function(){
        pc.go();
    });
    $("#pause").click(function(){
        pc.pause();
    });
    $("#resume").click(function(){
        pc.resume();
    });
    $("#term").click(function(){
        pc.reset();        
    });

    $("#minusSessionMinutes").click(function(){
        pcOpts.sessionMinutes--;
        pc = new PomodoroClock(pcOpts);
    });
    $("#plusSessionMinutes").click(function(){
        pcOpts.sessionMinutes++;
        pc = new PomodoroClock(pcOpts);
    });
     $("#minusBreakMinutes").click(function(){
        pcOpts.breakMinutes--;
        pc = new PomodoroClock(pcOpts);
    });
    $("#plusBreakMinutes").click(function(){
        pcOpts.breakMinutes++;
        pc = new PomodoroClock(pcOpts);
    });
});