$(document).ready(function(){
    var onTimerChanged = function(remainingMinutes){
        $("#timerDisplay").text(remainingMinutes)  
    }
    var onPCStateChanged = function(changedState){
        switch(changedState){
            case PCStates.ready:
                //$("#breakDisplay").text(`${pcOpts.breakMinutes}:00`);
                $("#timerDisplay").text(`${pcOpts.sessionMinutes}:00`);
                $("#breakMinutes").text(pcOpts.breakMinutes);
                $("#sessionMinutes").text(pcOpts.sessionMinutes);
                break;
            case PCStates.sip:
                $("#presentState").text("Session");
                break;
            case PCStates.bip:
                $("#presentState").text("Break");
                break;
            case PCStates.sp: 
                $("#presentState").text("Paused");
                break;
            case PCStates.bp:
                $("#presentState").text("Paused");
                break;
            
        }
    }
    var pcOpts = {
        sessionMinutes: 0.2,
        breakMinutes: 0.2,
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
});