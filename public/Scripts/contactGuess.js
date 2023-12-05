
// Hardcoded phone number and correct answer
const phoneNumber = "123-456-7890";
const correctAnswer = "12345";
const maxTries = 3;
let remainingTries = maxTries;

// Display each letter in colored boxes
const wordContainer = document.getElementById("word-container");
for (let i = 0; i < correctAnswer.length; i++) {
  const letterBox = document.createElement("div");
  letterBox.className = "letter-box";
  letterBox.id = `box-${i}`;
  letterBox.innerText = correctAnswer[i];
  wordContainer.appendChild(letterBox);
}

// Display heart icons for remaining tries
const heartContainer = document.getElementById("heart-container");
for (let i = 0; i < remainingTries; i++) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.innerText = "♥";
  heartContainer.appendChild(heart);
}

// Function to check the user's guess
function checkGuess() {
  const userGuess = document.getElementById("guessInput").value;
  const resultContainer = document.getElementById("result");

  if (remainingTries > 0) {
    for (let i = 0; i < correctAnswer.length; i++) {
      const letterBox = document.getElementById(`box-${i}`);

      if (userGuess[i] === correctAnswer[i]) {
        letterBox.style.backgroundColor = "green";
      } else if (correctAnswer.includes(userGuess[i])) {
        letterBox.style.backgroundColor = "yellow";
      } else {
        letterBox.style.backgroundColor = "red";
      }
    }

    if (userGuess === correctAnswer) {
      resultContainer.innerText = "Congratulations! Your guess is correct.";
      resultContainer.style.color = "green";
    } else {
      resultContainer.innerText = "Incorrect guess. Try again.";
      resultContainer.style.color = "red";
      remainingTries--;
    }

    // Update heart icons
    updateHearts();

    // Clear input field
    document.getElementById("guessInput").value = "";
  } else {
    resultContainer.innerText = "Sorry, you've run out of tries. The correct answer was: " + correctAnswer;
    resultContainer.style.color = "red";
    document.getElementById("submitGuess").disabled = true; // Disable further guesses
  }
}

// Function to update heart icons
function updateHearts() {
  const heartContainer = document.getElementById("heart-container");
  heartContainer.innerHTML = ""; // Clear existing hearts

  for (let i = 0; i < remainingTries; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.innerText = "♥";
    heartContainer.appendChild(heart);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const guessForm = document.getElementById("guessForm");
  const resultContainer = document.getElementById("result");

  guessForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const guessedName = document.getElementById("guessedName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    try {
      const response = await fetch("/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guessedName, phoneNumber }),
      });

      const result = await response.text();

      // Update the result container with the response
      resultContainer.textContent = result;
    } catch (error) {
      console.error(error);
      resultContainer.textContent = "Error occurred. Please try again.";
    }
  });
});