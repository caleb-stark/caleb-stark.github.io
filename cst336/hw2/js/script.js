document.querySelector("#roll-btn").addEventListener("click", round);
document.querySelector("#reset-btn").addEventListener("click", reset);

let warning = document.querySelector("#warning");
let result = document.querySelector("#result");

result.style.display = "none";
warning.style.display = "none";

let wallet = 1000;
document.querySelector("#wallet").textContent = wallet;

let diceImages = [
    "img/dice-1.svg",
    "img/dice-2.svg",
    "img/dice-3.svg",
    "img/dice-4.svg",
    "img/dice-5.svg",
    "img/dice-6.svg"
];

function round(){
    result.style.display = "none";
    warning.style.display = "none";

    if(make_bet()==false){
        return;
    }

    let die1 = Math.floor(Math.random() * 6) + 1;
    let die2 = Math.floor(Math.random() * 6) + 1;
    document.querySelector("#player-roll").textContent = die1;
    document.querySelector("#player-img").src = diceImages[die1 - 1];
    document.querySelector("#computer-roll").textContent = die2;
    document.querySelector("#computer-img").src = diceImages[die2 - 1];
    
    if (die1 > die2){
        result.textContent = "You win!";
        result.style.display = "block";
        result.style.color = "green";
        wallet += 2 * document.querySelector("#bet-amount").value;
    }else if (die1 < die2){
        result.textContent = "You lose!";
        result.style.display = "block";
        result.style.color = "red";
    }else {
        result.textContent = "It's a tie!";
        result.style.display = "block";
        result.style.color = "orange";
        wallet += 1 * document.querySelector("#bet-amount").value;
    }
    document.querySelector("#wallet").textContent = wallet;
}

function make_bet(){
    let bet = document.querySelector("#bet-amount").value;

    if(bet > wallet){
        warning.textContent = "You cannot bet more than you your wallet!";
        warning.style.display = "block";
        return false;
    } else if (bet <= 0){
        warning.textContent = "You must bet a positive amount!";
        warning.style.display = "block";
        return false;
    } else {  
        wallet -= bet;
        document.querySelector("#wallet").textContent = wallet;
    }
}

function reset(){
    wallet = 1000;
    document.querySelector("#wallet").textContent = wallet;
}