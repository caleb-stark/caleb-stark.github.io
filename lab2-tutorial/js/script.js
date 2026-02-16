document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

let randomNumber;
let attempts = 0;
let winloss = false;
let wins = 0;
let losses = 0;
let guessBtn = document.querySelector("#guessBtn");
let resetBtn = document.querySelector("#resetBtn");
let playerGuess = document.querySelector("#playerGuess"); 
let feedback = document.querySelector("#feedback");

initializeGame();

function initializeGame() {
    winloss = false;
    randomNumber = Math.floor(Math.random() * 99) + 1;
    attempts = 0;
    resetBtn.style.display = "none";
    guessBtn.style.display = "inline";
    playerGuess.focus();
    playerGuess.value = "";
    feedback.textContent = "";
    document.querySelector("#guesses").textContent = "";
}

function checkGuess(){
    feedback.textContent = "";
    let guess = playerGuess.value;
    if (guess < 1 || guess > 99) {   
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }   
    attempts++;  
    if (guess == randomNumber) {
            feedback.textContent = "You guessed it! You Won!";
            feedback.style.color = "green";
            winloss = true;
            gameOver();
    } else { 
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
        feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
        feedback.style.color = "red"; 
        gameOver();
        } else if ( guess > randomNumber) {
            feedback.textContent = "Guess was high";
            feedback.style.color = "orange";
        } else {
            feedback.textContent = "Guess was low";
            feedback.style.color = "blue";
        }
    }
}

function gameOver(){
    if(winloss) {
        wins++;
        document.querySelector("#win").textContent = "Wins: " + wins;
    }else {
        losses++;
        document.querySelector("#loss").textContent = "Losses: " + losses;
    }
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}

