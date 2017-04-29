$(document).ready(function () {

    var rf = function rf(blockId, cb) {
        return function () {
            $(blockId).fadeOut("slow", function () {
                $(blockId).fadeIn("slow", cb);
            });
        };
    };

    var visualize = function visualize(lp) {
        var f = function f() {};
        for (var j = lp.length - 1; j >= 0; j--) {
            var currentBlockId = "#block" + (lp[j] + 1);
            f = rf(currentBlockId, f);
        }
        f();
    };

    var currentPattern;

    var gameOpts = {
        stateChangedCallback: function stateChangedCallback(state, lastPattern, count) {
            currentPattern = [];
            switch (state) {
                case SimonStates.fresh:
                    $("#btnNew").addClass("disabled");
                    $("#btnStrict").addClass("disabled");
                    $("#count").text(0);
                    console.log('fresh game started');
                    break;
                case SimonStates.retry:
                    $("#result").text("retry");
                    visualize(lastPattern);
                    console.log('retry');
                    break;
                case SimonStates.won:
                    $("#result").text("won");
                    console.log('won');
                    break;
                case SimonStates.lost:
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
    };
    var game;

    var updateCurrentPattern = function updateCurrentPattern(n) {
        if (game) {
            currentPattern.push(n);
            if (currentPattern.length == game.count) {
                game.submitPattern(currentPattern);
            }
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

    $("#btnNew").click(function () {
        game = new Simon(gameOpts);
    });
    $("#btnStop").click(function () {
        game = null;
        $("#btnNew").removeClass("disabled");
    });
    $("#btnStrict").click(function () {
        gameOpts.retryEnabled = !gameOpts.retryEnabled;
    });

    $("#btnStop").addClass("disabled");
});