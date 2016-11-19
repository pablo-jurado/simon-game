// DOM
var green = document.getElementById("green-btn");
var blue = document.getElementById("blue-btn");
var red = document.getElementById("red-btn");
var yellow = document.getElementById("yellow-btn");

var start = document.getElementById("start");
var stop = document.getElementById("stop");
var strict = document.getElementById("strict");
var countScreen = document.getElementsByClassName("count");

// global variables
var colorArray = [green, red, blue, yellow];
var gamePlays = [];
var turns = 0;
var humanMoveRecord = 0;
var userWrong = false;
var useStrict = false;

//audio
var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
//var audioWrong = new Audio('http://www.wavsource.com/snds_2016-10-30_1570758759693582/sfx/buzzer_x.wav');
var audioWrong = new Audio('http://www.wavsource.com/snds_2016-10-30_1570758759693582/sfx/boing_x.wav');

var btnColorEvent = function() {
    playAudio(this);
    logHumanPlay(this);
    addActiveClass(this);
}
var startBtnEvent = function() {
  green.addEventListener("mousedown", btnColorEvent);
  red.addEventListener("mousedown", btnColorEvent);
  blue.addEventListener("mousedown", btnColorEvent);
  yellow.addEventListener("mousedown", btnColorEvent);
}
// removes all event listener
var removeBtnEvent = function() {
  green.removeEventListener("mousedown", btnColorEvent);
  red.removeEventListener("mousedown", btnColorEvent);
  blue.removeEventListener("mousedown", btnColorEvent);
  yellow.removeEventListener("mousedown", btnColorEvent);
}

var addPushedClass = function(btn) {
  btn.classList.add("btn-pushed");
}
var removeAllPushedClass = function(btn) {
  start.classList.remove("btn-pushed");
  stop.classList.remove("btn-pushed");
  strict.classList.remove("btn-pushed");
}

var playAudio = function(color) {
    switch(color) {
      case green:
          audio1.play();
          break;
      case red:
          audio2.play();
          break;
      case blue:
          audio3.play();
          break;
      case yellow:
          audio4.play();
          break;
    }
}

var addActiveClass = function(color) {
  color.classList.add("active");
  setTimeout(function() {
     color.classList.remove("active");
  }, 500);
}

var computerPushButton = function(color) {
  playAudio(color);
  addActiveClass(color);
}
var logScreen = function(input) {
  countScreen[0].innerHTML = input;
}
var updateTurns = function() {
  turns++
  logScreen(turns);
};
var randomPlay = function() {
  var randomNum = Math.floor(Math.random() * 4);
  gamePlays.push(randomNum);
  updateTurns();
  computerPlay(randomNum);
}

function delayedFunc(func, time) {
  setTimeout(func, time);
}

var computerPlay = function (number) {
  computerPushButton(colorArray[number]);
}

var computerTurn = function() {
  countScreen[0].innerHTML = turns;// updates screen turns
  for (var i = 0; i < gamePlays.length; i++) {
      setTimeout(function(x) { return function() {
        computerPlay(gamePlays[x]);
        if(x === gamePlays.length - 1 && userWrong === false) {
          delayedFunc(randomPlay, 1000);
        }
      }; }(i), 1000*i);
  }
}

var logHumanPlay = function(color) {

  if(gamePlays[humanMoveRecord] === colorArray.indexOf(color)) {
    humanMoveRecord++
  } else if(useStrict === true) {
    logScreen("X");
    audioWrong.play();
    gamePlays = [];
    turns = 0;
    humanMoveRecord = 0;
    delayedFunc(randomPlay, 1500);
    return;
  } else {
    logScreen("X"); //wrong move!
    audioWrong.play();
    userWrong = true;// computer has to replay but no randomPlay
    humanMoveRecord = 0;
    delayedFunc(computerTurn, 2000);
  }
  if(humanMoveRecord === gamePlays.length) {
    humanMoveRecord = 0;
    userWrong = false;
    delayedFunc(computerTurn, 2000);
  }
};

start.addEventListener("click", function() {
  addPushedClass(this);
  delayedFunc(randomPlay, 1000);
  startBtnEvent();
});
stop.addEventListener("click", function() {
  removeAllPushedClass();
  removeBtnEvent();
  logScreen("");
  turns = 0;
  humanMoveRecord = 0;
  gamePlays = [];
});
strict.addEventListener("click", function() {
  useStrict = !useStrict;
  if(useStrict === true) {
    addPushedClass(this);
  } else {
    strict.classList.remove("btn-pushed");
  }
});
