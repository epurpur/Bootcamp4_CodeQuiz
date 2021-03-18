
// declaring variables for HTML elements needed to interact with
var scoresDisplay = document.getElementById("scores-display");
var playerScore = document.querySelectorAll(".player-score");
var playAgainBtn = document.getElementById("btn-playAgain");

function displayScores() {
    // Take storedData array and insert it into scoreboard
    var storedData = JSON.parse(localStorage.getItem('userInfo'));
    storedData.pop();   //REMOVE THIS LATER
    storedData.pop();   //REMOVE THIS LATER
    
    for (var i = 0; i < storedData.length; i++) {
        playerScore[i].textContent = `${storedData[i].name}: ${storedData[i].userScore}`;
    }
}

// Upon click of play again button, goes back to index.html for a new game
playAgainBtn.addEventListener("click", function() {
    location.href = "index.html";
});

displayScores();






~~~~~~~~~~~~~~~~~~




// // You need to remember the function you used with `addEventListener`, then use that same function with `removeEventListener`.

// var answerChoice = document.querySelectorAll(".answer-choice");    //this is a nodelist of 4 HTML elements

// function evaluateUserChoice(randomQ) {
//     // takes random question created from makeQuestion()
//     // evaluates if user clicks on correct answer or not

//     for (var i = 0; i < answerChoice.length; i++) {
//         // *** NOTE: Must be `const` or `let`, not `var`
//         const fn = function(event) {
//             var element = event.target;
//             //checking to see if user choice is correct
//             if (element.textContent === randomQ.correct) {
//                 score++;
//                 numberCorrect.textContent = score;
//                 answerChoice[i].removeEventListener("click", fn); // ***
//                 makeQuestion();                     // resets text content of HTML
//             } else {
//                 answerChoice[i].removeEventListener("click", fn); // ***
//                 makeQuestion();                     // resets text content of HTML
//             }    
//         };
//         answerChoice[i].addEventListener("click", fn);
//     }
// }

// // BUT, you don't have to create a new function every time. Instead:

// var answerChoice = document.querySelectorAll(".answer-choice");    //this is a nodelist of 4 HTML elements

// function choiceClickHandler(event) {
//     var element = event.target;
//     //checking to see if user choice is correct
//     if (element.textContent === randomQ.correct) {
//         score++;
//         numberCorrect.textContent = score;
//         this.removeEventListener("click", choiceClickHandler); // *** `this` is the element you hooked the handler to
//         makeQuestion();                     // resets text content of HTML
//     } else {
//         this.removeEventListener("click", choiceClickHandler); // *** `this` is the element you hooked the handler to
//         makeQuestion();                     // resets text content of HTML
//     }    
// }

// function evaluateUserChoice(randomQ) {
//     // takes random question created from makeQuestion()
//     // evaluates if user clicks on correct answer or not

//     for (var i = 0; i < answerChoice.length; i++) {
//         answerChoice[i].addEventListener("click", choiceClickHandler);
//     }
// }