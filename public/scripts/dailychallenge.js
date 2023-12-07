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
    var areaCode = areaCodeInput.value;
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
}

function incorrect() {
    var resultMessage = document.getElementById("resultMessage");
    resultMessage.innerText = "Incorrect";
    openResultBox();
}

function openResultBox() {
    var resultBox = document.getElementById("resultBox");
    resultBox.classList.add("show");
}

function closeResultBox() {
    var resultBox = document.getElementById("resultBox");
    resultBox.classList.remove("show");
}

selectRandomLocation();