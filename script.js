let simon = document.querySelectorAll(".simon");
let start = document.querySelector("#start");
let rules = document.querySelector("#rules");
let middle = document.querySelector(".middle");
let modal1 = document.querySelector("#modal1");
let modal2 = document.querySelector("#modal2");
let playAgain = document.querySelector("#play-again");
let selectLevel = document.querySelector("#level");
let colors = ["red", "yellow", "blue", "green", ];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;


// Welcome to the game
// document.body.onload = sound("welcome.mp3")

// Show rules of the game
rules.addEventListener("click", function () {
    modal2.classList.add("show");
})
// Close modal2
document.querySelector("#close-rules").addEventListener("click", function(){
    modal2.classList.remove("show");
})

// Start game
start.addEventListener("click", function () {
    if (!started){
        readyStart();
    }
    setTimeout(function () {
        if (!started) {
            gamePlay();
            started = true;
        }
    }, 3500);
});

// Game play
simon.forEach(function (item) {
    item.addEventListener("click", function () {
        let userColor = this.id;
        userPattern.push(userColor);
        sound(userColor);
        animate(userColor);
        gameCheck(userPattern.length - 1);
    });
});

// close modal1
playAgain.addEventListener("click", function(){
    gameOver();
});


// ================= FUNCTION ====================

// Function running when start pressed
function readyStart() {
    sound('starting');
    let count = 0;
    let interval = setInterval(frame, 100);
    function frame() {
        if (count == 25) {
            clearInterval(interval);
        } else {
            let color = count % 4;
            animate(colors[color]);
            count++;
            middle.innerHTML = (`Ready Start in ${25-count}`);
        }
    }
}

// Runing when game started
function gamePlay() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = colors[randomNumber]; // Pattern color indikator
    // restart user pattern
    userPattern = [];
    // push random color to game pattern
    gamePattern.push(randomColor); 
    
    level++;
    middle.innerHTML = (`Level ${level}`);

    sound(randomColor); 
    animate(randomColor);
}

// Function to check answer
function gameCheck(userLevel) {
    // check every user click  the pattern
    if (gamePattern[userLevel] === userPattern[userLevel]) {
        // check length of user pattern length
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                gamePlay();
            }, 1000);
        }
    } else {
        // show modal1 if user give wrong answer
        modal1.classList.add("show"); 
        sound("wrong");
        selectLevel.innerHTML = `<h1> ${level} </h1>`;
    }
}

// Restart the game, runing when close modal
function gameOver() {
    modal1.classList.remove("show");
    middle.innerHTML = ("Press Start!");
    level = 0;
    gamePattern = [];
    started = false;
}

// Play sound
function sound(name) {
    let audio = new Audio(`audio/${name}.mp3`);
    audio.play();
}
// Run animation when button pressed
function animate(currentColor) {
    document.querySelector("#" + currentColor).classList.add("click");
    setTimeout(function () {
        document.querySelector("#" + currentColor).classList.remove("click");
    }, 100);
}
