function guess() {
    var areaCode = document.getElementById("areaCodeInput").value;
    var resultMessage = document.getElementById("resultMessage");
    resultMessage.innerText = "Entered Area Code: " + areaCode;
    var resultBox = document.getElementById("resultBox");
    resultBox.classList.add("show");
  }
  
  function closeResultBox() {
    var resultBox = document.getElementById("resultBox");
    resultBox.classList.remove("show");
  }
  