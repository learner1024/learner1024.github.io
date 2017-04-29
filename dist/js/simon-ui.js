$(document).ready(function () {
    var visualize = function visualize(lp) {
        lp.forEach(function (e, i) {
            $('#block' + (e + 1)).addClass("animated fadeIn");
        });
    };

    var currentPattern;

    var gameOpts = {
        stateChangedCallback: function stateChangedCallback(state, lastPattern) {
            currentPattern = [];
            switch (state) {
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
                    $('#block1').removeClass("animated fadeIn");
                    $('#block2').removeClass("animated fadeIn");
                    $('#block3').removeClass("animated fadeIn");
                    $('#block4').removeClass("animated fadeIn");
                    visualize(lastPattern);
                    console.log('next pattern added');
                    break;
            }
        }
    };
    var game = new Simon(gameOpts);

    var updateCurrentPattern = function updateCurrentPattern(n) {
        currentPattern.push(n);
        if (currentPattern.length == game.count) {
            game.submitPattern(currentPattern);
        }
    };

    $("#block1").click(function () {
        updateCurrentPattern(0);
    });
    $("#block2").click(function () {
        updateCurrentPattern(1);
    });
    $("#block3").click(function () {
        updateCurrentPattern(2);
    });
    $("#block4").click(function () {
        updateCurrentPattern(3);
    });
});