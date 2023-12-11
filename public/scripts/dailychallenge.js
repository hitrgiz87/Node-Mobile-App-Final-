const maxTries = 3;
var locations = [
    { town: "Pittsburg", state: "Kansas", areaCode: "620" },
    { town: "Girard", state: "Kansas", areaCode: "620" },
    { town: "Weir", state: "Kansas", areaCode: "620" },
    { town: "Iola", state: "Kansas", areaCode: "620" },
    { town: "Fort Scott", state: "Kansas", areaCode: "620" },
    { town: "Chanute", state: "Kansas", areaCode: "620" },
    { town: "Parsons", state: "Kansas", areaCode: "620" },
    { town: "Baxter Springs", state: "Kansas", areaCode: "620" },
    { town: "Independence", state: "Kansas", areaCode: "620" },
    { town: "Arcadia", state: "Kansas", areaCode: "417" },
    { town: "Joplin", state: "Missouri", areaCode: "417" },
];
var previousRandomIndex = -1;
var correctAreaCode;
var score = 0;
let remainingTries = maxTries;

// Restrict input to 3 numbers
document.getElementById("areaCodeInput").addEventListener("input", function() {
    var inputValue = this.value;
    var numericValue = inputValue.replace(/\D/g, '');
    var truncatedValue = numericValue.slice(0, 3);
    this.value = truncatedValue;
});

function selectRandomLocation() {
    var randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * locations.length);
    } while (randomIndex === previousRandomIndex);
    var randomLocation = locations[randomIndex];
    var locationTitle = document.querySelector(".location-title");
    locationTitle.innerText = randomLocation.town + ", " + randomLocation.state;
    correctAreaCode = randomLocation.areaCode;
    previousRandomIndex = randomIndex;
}

function guess() {
    var areaCodeInput = document.getElementById("areaCodeInput");
    var areaCode = areaCodeInput.value.trim();
    if (areaCode === '') {
        return;
    }
    if (areaCode === correctAreaCode) {
        correct();
    } else {
        incorrect();
    }
    areaCodeInput.value = "";
}


function correct() {
    var resultMessage = document.getElementById("resultMessage");
    resultMessage.innerText = "Correct!";
    openResultBox();
    selectRandomLocation();
    score++;
    updateScoreDisplay();
}

function incorrect() {
    var resultMessage = document.getElementById("resultMessage");
    remainingTries--;
    updateHearts();
    if (remainingTries === 0) {
        resultMessage.innerText = "Incorrect. You are out of lives!";
    }
    else {
        resultMessage.innerText = "Incorrect.";
    }
    openResultBox();
}

function updateScoreDisplay() {
    var scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.innerText = score;
}

function openResultBox() {
    var resultBox = document.getElementById("resultBox");
    var goButton = document.getElementsByClassName("go-button")[0];
    resultBox.classList.add("show");
    goButton.disabled = true;
}

function closeResultBox() {
    var resultBox = document.getElementById("resultBox");
    var goButton = document.getElementsByClassName("go-button")[0];
    resultBox.classList.remove("show");
    goButton.disabled = false;

    if (remainingTries === 0) {
        returnToMainMenu();
    }
}

function updateHearts() {
    const heartContainer = document.getElementById("heart-container");
    heartContainer.innerHTML = "";
    for (let i = 0; i < remainingTries; i++) {
        const heart = document.createElement("span");
        heart.className = "heart";
        heart.innerText = "♥";
        heartContainer.appendChild(heart);
    }
}

function returnToMainMenu() {
    window.location.href = '/';
}

selectRandomLocation();
updateHearts();
updateScoreDisplay();