document.querySelector("button").addEventListener("click", submit);

let fb1 = document.querySelector("#fb1");
let fb2 = document.querySelector("#fb2");
let fb3 = document.querySelector("#fb3");
let fb4 = document.querySelector("#fb4");
let fb5 = document.querySelector("#fb5");
let fb1_img = document.querySelector("#fb1-img");
let fb2_img = document.querySelector("#fb2-img");
let fb3_img = document.querySelector("#fb3-img");
let fb4_img = document.querySelector("#fb4-img");
let fb5_img = document.querySelector("#fb5-img");

const q5_choices = [
    { value: "css", label: "CSS" },
    { value: "cst", label: "CST" },
    { value: "cs",  label: "CS" }
];
const shuffled_q5 = _.shuffle(q5_choices);
shuffled_q5.forEach(choice => {
    let id = "q5-" + choice.value;
    document.querySelector("#q5-container").innerHTML += `
        <input type="checkbox" id="${id}" name="q5" value="${choice.value}">
        <label for="${id}">${choice.label}</label>
    `;
});

function submit(){
    let score = 0;
    let answer1 = document.querySelector("input[name=q1]:checked").value;
    let answer2 = document.querySelector("#q2").value;
    let answer3 = document.querySelector("#q3").value;
    let answer4 = document.querySelector("#q4").value;  
    if(answer1 === "false"){
        score+=20;
        fb1.textContent = "Correct!";
        fb1.style.color = "green";
        fb1_img.src = "img/check.png";
    }else{
        fb1.textContent = "Incorrect!";
        fb1.style.color = "red";
        fb1_img.src = "img/x.png";
    }
    if(answer2 === "Monte Rey" || answer2 === "Monte"){
        score+=20;
        fb2.textContent = "Correct!";
        fb2.style.color = "green";
        fb2_img.src = "img/check.png";
    }else{
        fb2.textContent = "Incorrect!";
        fb2.style.color = "red";
        fb2_img.src = "img/x.png";
    }
    if(answer3 === "7"){
        score+=20;
        fb3.textContent = "Correct!";
        fb3.style.color = "green";
        fb3_img.src = "img/check.png";
    }else{
        fb3.textContent = "Incorrect!";
        fb3.style.color = "red";
        fb3_img.src = "img/x.png";
    }
    if(answer4 === "seaside"){
        score+=20;
        fb4.textContent = "Correct!";
        fb4.style.color = "green";
        fb4_img.src = "img/check.png";
    }else{
        fb4.textContent = "Incorrect!";
        fb4.style.color = "red";
        fb4_img.src = "img/x.png";
    }
    let cst_checked = document.querySelector("input[name='q5'][value='cst']").checked;
    let css_checked = document.querySelector("input[name='q5'][value='css']").checked;
    let cs_checked  = document.querySelector("input[name='q5'][value='cs']").checked;
    if(cst_checked && !css_checked && !cs_checked){
        score+=20;
        fb5.textContent = "Correct!";
        fb5.style.color = "green";
        fb5_img.src = "img/check.png";
    }else{
        fb5.textContent = "Incorrect!";
        fb5.style.color = "red";
        fb5_img.src = "img/x.png";
    }
    document.querySelector("#score").textContent = "Your score is: " + score;
    if(score >= 80){
        document.querySelector("#congrats").textContent = "Congratulations! You scored above 80%!";
    }
    let attempts = localStorage.getItem("quiz_attempts");
    attempts++;
    localStorage.setItem("quiz_attempts", attempts);
    document.querySelector("#attempts").textContent = "Total Attempts: " + attempts;
}

let attempts = localStorage.getItem("quiz_attempts");
if(attempts === null){
    attempts = 0;
    localStorage.setItem("quiz_attempts", attempts);
}

