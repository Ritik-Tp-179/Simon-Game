
var buttonColors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickPattern = [];
var started = false;
var level = 0;


$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function (event) {
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor)
    checkAnswer(userClickPattern.length - 1)
});

function checkAnswer(currentLevel) {
    if (gamepattern[currentLevel] === userClickPattern[currentLevel]) {
        if (userClickPattern.length === gamepattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setInterval(function () {
            $("body").removeClass("game-over");
        }, 200)
        startOver();
    }
}

function nextSequence() {
    userClickPattern = [];
    level++;
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChooseColor = buttonColors[randomNumber];
    gamepattern.push(randomChooseColor);

    playSound(randomChooseColor);
    $('#' + randomChooseColor).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setInterval(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function playSound(name) {
    var audio1 = new Audio("sounds/" + name + ".mp3");
    audio1.play();
}
function startOver() {
    level = 0;
    gamepattern = [];
    started = false;
}
