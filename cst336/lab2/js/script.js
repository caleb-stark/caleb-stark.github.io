//event listeners
document.querySelector("#guessBtn").addEventListener("click", guess);

//Global variables
//Generates a number between 1 and 99
let randomNumber = Math.floor(Math.random() * 99) + 1;
let count = 0;
function guess() {
     let userGuess = document.querySelector("#userGuess").value;
    //"value" is only for input elements

    // alert(userGuess);
    document.querySelector("#userGuesses").textContent += `${userGuess} `;
    if (count < 7) {
        if (userGuess > randomNumber) {
            document.querySelector("#guessResult").textContent = "Too High!";
            document.querySelector("#guessResult").style.color = "red";
        } else if (userGuess < randomNumber) {
            document.querySelector("#guessResult").textContent = "Too Low!";
            document.querySelector("#guessResult").style.color = "blue";
        } else {
            document.querySelector("#guessResult").textContent = "Correct!";
            document.querySelector("#guessResult").style.color = "green";
        }
    } else {
        document.querySelector("#guessResult").textContent = "Out of Guesses! " + randomNumber;
    }
    count++;

}
