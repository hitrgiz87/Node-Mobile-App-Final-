
// Hardcoded phone number and correct answer
var guessForm = document.getElementById('guessForm');
var resultModal = document.getElementById('resultModal');
var resultModalBody = document.getElementById('resultModalBody');
const maxTries = 3;
let remainingTries = maxTries;



// Display heart icons for remaining tries
const heartContainer = document.getElementById("heart-container");
for (let i = 0; i < remainingTries; i++) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.innerText = "♥";
  heartContainer.appendChild(heart);
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












guessForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    try {
        const response = await fetch('/contactGuess/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guessInput: guessForm.elements.guessInput.value,
                phoneNumber: guessForm.elements.phoneNumber.value,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();
        resultModalBody.innerHTML = result;
        $('#resultModal').modal('show');
    } catch (error) {
        console.error(error);
        resultModalBody.innerHTML = 'Error occurred. Please try again.';
        $('#resultModal').modal('show');
    }

    $('#resultModal').on('hidden.bs.modal', function () {
      location.reload(); // Reload the page when the modal is closed
  });
});

