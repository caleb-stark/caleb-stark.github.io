let zip_element = document.querySelector("#zipcode");

zip_element.addEventListener("change", display_city);
document.querySelector("#password").addEventListener("click", passowrd_suggestion);
document.querySelector("#user-id").addEventListener("change", user_availability);
document.querySelector("#state").addEventListener("change", display_counties);
document.querySelector("#submit-btn").addEventListener("click", submit);

async function user_availability(){
    let user_availability = document.querySelector("#user-availability");
    let username = document.querySelector("#user-id").value;
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + username;
    const response = await fetch(url);
    const data = await response.json();
    if(data.available){
        user_availability.textContent = "Username is available!";
        user_availability.style.color = "green";

    } else {
        user_availability.textContent = "Username is not available.";
        user_availability.style.color = "red";
    }

}

async function passowrd_suggestion(){
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        document.querySelector("#password-text").textContent = data.password;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function display_city(){
    let zipcode = zip_element.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipcode;   
    let response = await fetch(url);
    let data = await response.json();
    document.querySelector("#city-text").textContent = data.city;
    document.querySelector("#latitude-text").textContent = data.latitude;
    document.querySelector("#longitude-text").textContent = data.longitude;
}

display_states();
async function display_states(){
    let url = "https://csumb.space/api/allStatesAPI.php"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        for (let i of data) {
            let option_el = document.createElement("option");
            option_el.textContent = i.state;
            option_el.value = i.usps;

            document.querySelector("#state").append(option_el);
        }
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function display_counties(){
    let test = document.querySelector("#state").value;
    console.log(test);
    let url = "https://csumb.space/api/countyListAPI.php?state=" + document.querySelector("#state").value;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        document.querySelector("#county").textContent = "";
        for (let i of data) {
            let option_el = document.createElement("option");
            option_el.textContent = i.county;
            option_el.value = i.county;

            document.querySelector("#county").append(option_el);
        }
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

function submit(){
    let password = document.querySelector("#password").value;
    let warning = document.querySelector("#password-warning");
    if (password.length < 6) {
        warning.textContent = "Password must be at least 6 characters long.";
        warning.style.color = "red";
        warning.style.display = "inline";
    } else{
        warning.style.display = "none";
    }   
}