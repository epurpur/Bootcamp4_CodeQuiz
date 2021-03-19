
// declaring variables for HTML elements needed to interact with
var scoresDisplay = document.getElementById("scores-display");
var playerScore = document.querySelectorAll(".player-score");
var playAgainBtn = document.getElementById("btn-playAgain");

function displayScores() {
    // Take storedData array and insert it into scoreboard
    var storedData = JSON.parse(localStorage.getItem('userInfo'));
    
    for (var i = 0; i < storedData.length; i++) {
        playerScore[i].textContent = `${storedData[i].name}: ${storedData[i].userScore}`;
    }
}

// Upon click of play again button, goes back to index.html for a new game
playAgainBtn.addEventListener("click", function() {
    location.href = "index.html";
});

displayScores();




