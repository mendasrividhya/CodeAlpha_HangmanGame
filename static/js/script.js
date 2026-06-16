// ==============================
// HANGMAN GAME
// Part 1 - Variables & Functions
// ==============================

const wordBank = {
    easy: [
        "DOG","CAT","BALL","BOOK","TREE",
        "FISH","BIRD","APPLE","CHAIR","PHONE"
    ],

    medium: [
        "PYTHON","CODING","PROGRAM","NETWORK",
        "MONITOR","DATABASE","KEYBOARD",
        "COMPUTER","SOFTWARE","WEBSITE"
    ],

    hard: [
        "JAVASCRIPT",
        "ALGORITHM",
        "MULTITHREADING",
        "ENCAPSULATION",
        "AUTHENTICATION",
        "MICROSERVICE",
        "FRAMEWORK",
        "DEVELOPER"
    ]
};

let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let timer;
let timeLeft = 60;

const hangmanParts = [
    "head",
    "body",
    "leftArm",
    "rightArm",
    "leftLeg",
    "rightLeg"
];

function startGame(){

    const level =
        document.getElementById("difficulty").value;

    const words =
        wordBank[level];

    selectedWord =
        words[Math.floor(Math.random()*words.length)];

    guessedLetters=[];

    wrongGuesses=0;

    clearInterval(timer);

    hideHangman();

    createKeyboard();

    updateWord();

    updateLives();

    document.getElementById("message").innerHTML="";

    document.getElementById("score").innerHTML=score;

    document.getElementById("highScore").innerHTML=highScore;

    startTimer();

}

function hideHangman(){

    hangmanParts.forEach(part=>{

        document
        .getElementById(part)
        .setAttribute("visibility","hidden");

    });

}

function updateLives(){

    let hearts="";

    for(let i=0;i<6-wrongGuesses;i++){

        hearts+="❤️";

    }

    document.querySelector(".lives").innerHTML=hearts;

}

function updateWord(){

    let display="";

    for(let letter of selectedWord){

        if(guessedLetters.includes(letter))
            display+=letter+" ";
        else
            display+="_ ";

    }

    document.getElementById("word").innerHTML=display;

    if(!display.includes("_")){

        score++;

        document.getElementById("score").innerHTML=score;

        if(score>highScore){

            highScore=score;

            localStorage.setItem("highScore",highScore);

            document.getElementById("highScore").innerHTML=highScore;

        }

        clearInterval(timer);

        document.getElementById("message").innerHTML=
        "🎉 Congratulations!";

        disableKeyboard();

    }

}
function createKeyboard() {

    const keyboard = document.getElementById("keyboard");

    keyboard.innerHTML = "";

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let letter of letters) {

        const btn = document.createElement("button");

        btn.innerHTML = letter;

        btn.className = "key";

        btn.addEventListener("click", function () {

            btn.disabled = true;

            guessedLetters.push(letter);

            if (selectedWord.includes(letter)) {

                updateWord();

            } else {

                wrongGuesses++;

                updateLives();

                showHangmanPart();

                if (wrongGuesses >= 6) {

                    clearInterval(timer);

                    document.getElementById("message").innerHTML =
                        "💀 Game Over!<br>Word: <b>" + selectedWord + "</b>";

                    disableKeyboard();
                }

            }

        });

        keyboard.appendChild(btn);

    }

}

function showHangmanPart() {

    if (wrongGuesses <= hangmanParts.length) {

        document
            .getElementById(hangmanParts[wrongGuesses - 1])
            .setAttribute("visibility", "visible");

    }

}

function disableKeyboard() {

    const buttons = document.querySelectorAll("#keyboard button");

    buttons.forEach(button => {

        button.disabled = true;

    });

}

function startTimer() {

    timeLeft = 60;

    document.getElementById("timer").innerHTML = timeLeft;

    timer = setInterval(function () {

        timeLeft--;

        document.getElementById("timer").innerHTML = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            document.getElementById("message").innerHTML =
                "⏰ Time's Up!<br>Word: <b>" + selectedWord + "</b>";

            disableKeyboard();

        }

    }, 1000);

}
// ==============================
// Restart Game
// ==============================

document.getElementById("restartBtn").addEventListener("click", function () {

    startGame();

});

// ==============================
// Change Difficulty
// ==============================

document.getElementById("difficulty").addEventListener("change", function () {

    startGame();

});

// ==============================
// Keyboard Support
// ==============================

document.addEventListener("keydown", function (event) {

    let letter = event.key.toUpperCase();

    if (!/^[A-Z]$/.test(letter)) return;

    let buttons = document.querySelectorAll("#keyboard button");

    buttons.forEach(btn => {

        if (btn.innerHTML === letter && !btn.disabled) {

            btn.click();

        }

    });

});

// ==============================
// Start Game
// ==============================

window.onload = function () {

    document.getElementById("score").innerHTML = score;

    document.getElementById("highScore").innerHTML = highScore;

    startGame();

};
