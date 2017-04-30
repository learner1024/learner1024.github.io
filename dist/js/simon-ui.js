$(document).ready(function () {

    var audio1 = new Audio('audio/simonSound4.mp3');
    var audio2 = new Audio('audio/simonSound3.mp3');
    var audio3 = new Audio('audio/simonSound2.mp3');
    var audio4 = new Audio('audio/simonSound1.mp3');
    var audios = [audio1, audio2, audio3, audio4];

    $("#toggleStrict").bootstrapToggle({
        on: 'Strict',
        off: 'Easy'
    });

    var animationInProgress = false;

    var rf = function rf(blockId, cb, blockIndex) {
        return function () {

            audios[blockIndex].onended = function () {
                $(blockId).fadeOut("fast", function () {
                    $(blockId).fadeIn("fast", cb);
                });
            };
            audios[blockIndex].play();
        };
    };

    var visualize = function visualize(lp) {
        setTimeout(function () {
            animationInProgress = true;
            var f = function f() {
                animationInProgress = false;
                audios[0].onended = null;
                audios[1].onended = null;
                audios[2].onended = null;
                audios[3].onended = null;
            };
            for (var j = lp.length - 1; j >= 0; j--) {
                var currentBlockId = '#block' + (lp[j] + 1);
                f = rf(currentBlockId, f, lp[j]);
            }
            f();
        }, 1000);
    };

    var currentPattern;

    var gameOpts = {
        retryEnabled: true,
        stateChangedCallback: function stateChangedCallback(state, lastPattern, count) {
            currentPattern = [];
            switch (state) {
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
                    $("#result").removeClass("hide");
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
    };
    var game;

    var updateCurrentPattern = function updateCurrentPattern(n) {
        if (game != null && animationInProgress == false) {
            $("#result").addClass("hide");
            audios[n].play();
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
        $("#btnNew").removeClass("hide");
        $(".toggle").removeClass("hide");
        $("#btnStop").addClass("hide");
        $("#count").text(0);
        $("#count").addClass("hide");
        $("#result").text("");
    });

    $('#toggleStrict').change(function () {
        gameOpts.retryEnabled = !$(this).prop('checked');
    });
});