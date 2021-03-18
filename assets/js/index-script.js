
// declaring variables for HTML elements needed to interact with
var questionTitle = document.getElementById("question-title");
var answerChoice = document.querySelectorAll(".answer-choice");
var numberCorrect = document.getElementById("number-correct");
var questions = document.getElementById("question-bank");
var startBtn = document.getElementById("btn-newGame");
var scoreboard = document.getElementById("scoreboard");
var finalInputForm = document.getElementById('final-user-input');
var finalScoreValue = document.getElementById('final-score-value');
var submissionForm = document.getElementById('submission-form');
var userName = document.getElementById('user-name');
var submitBtn = document.getElementById('btnSubmitScore');
var timerElement = document.getElementById('timer-element');
var timeCount = document.getElementById('time-count');

/** holds all questions used in the quiz. Stores an array of objects. Each question is an object.
 *  Each question has three properties:
 *              qTitle: title of question
 *              answers: an array of answer choices
 *              correct: the correct answer choice              
 */             
var questionBank = [
    {qTitle:"What is the name of a container for storing a data value in Javascript?", answers: ["element", "variable", "document", "viewport"], correct: "variable"},
    {qTitle:"In javascript, what is an ordered list of values called?", answers: ["array", "object", "loop", "html"], correct: "array"},
    {qTitle:"What is the name for the language used to describe the presentation of a document?", answers: ["html", "javascript", "css", "python"], correct: "css"},
    {qTitle:"What is the name of the version control software we use in this course?", answers: ["bitbucket", "vs code", "terminal", "git"], correct: "git"},
    {qTitle:"Which layout tool allows us easy, flexible design of our html elements?", answers: ["javascript", "flexbox", "css", "github"], correct: "flexbox"},
    {qTitle:"What property of the window object allows us to save information, even after a browser refresh?", answers: ["getItem", "textContent", "addEventListener", "localStorage"], correct: "localStorage"},
    {qTitle:"In javascript, what is the name for a reusable piece of code written to perform a specific task?", answers: ["function", "object", "string", "variable"], correct: "function"}
]

// accumulator variable which counts correct answer choices
var score = 0;


// global timer variable
var timeleft = 3;

function timer() {
    // starts timer countdown starting from value of timeLeft
    var countDown = setInterval(function() {
        timeleft--;
        timeCount.textContent = timeleft;

        if (timeleft <= 0) {
            clearInterval(countDown);   // stops at 0
        }
    }, 1000);    //counts in milliseconds. 1000ms = 1second
}



function randomQuestion() {
    // chooses random question from questionBank
    var randomQ = questionBank[Math.floor(Math.random() * questionBank.length)]
    return randomQ;
}


function makeQuestion() {
    // Creates questions and displays information on page
    // generates random question to get data about
    var randomQ = randomQuestion()
    console.log(randomQ);

    // set title text of random question
    questionTitle.textContent = randomQ.qTitle;

    //sets text content of each answer choice to value of corresponding index of random question answers
    for (var i = 0; i < answerChoice.length; i++) {
        answerChoice[i].textContent = randomQ.answers[i];
    }

    // remove question from questionBank so that it is not asked again
    qIndex = questionBank.indexOf(randomQ);
    questionBank.splice(qIndex, 1);
    
    evaluateUserChoice(randomQ);
}






// function evaluateUserChoice(randomQ) {
//     // takes random question created from makeQuestion()
//     // evaluates if user clicks on correct answer or not
    
//     if (timeleft > 0) {      // if there is still time left on the clock
//         for (var i = 0; i < answerChoice.length; i++) {
//             answerChoice[i].addEventListener("click", function(event) {
//                 var element = event.target;
//                 //checking to see if user choice is correct
//                 if (element.textContent === randomQ.correct) {
//                     score++;
//                     numberCorrect.textContent = score;
//                     // answerChoice[i].removeEventListener("click", fn);
//                     if (questionBank.length > 0) {   //if there are any questions remaining in the questionBank
//                         makeQuestion();   //make next question
//                     } else {                         //if there are no questions remaining in the questionBank
//                         setFinalStyling();   //set final styles of page; 
//                     }
//                 } else {
//                     // answerChoice[i].removeEventListener("click", fn);
//                     if (questionBank.length > 0) {
//                         makeQuestion();
//                     } else {
//                         setFinalStyling();
//                     }
//                 }    
//             });
//         }
//     } else {       //if no time remaining, skip straight to final styling upon click
//         setFinalStyling();
//     }
// }


function evaluateUserChoice(randomQ) {
    // takes random question created from makeQuestion()
    // evaluates if user clicks on correct answer or not

    for (var i = 0; i < answerChoice.length; i++) {
        // *** NOTE: Must be `const` or `let`, not `var`
        console.log('outer', answerChoice[i]);
        const fn = function(event) {
            console.log(answerChoice[i]);
            var element = event.target;
            //checking to see if user choice is correct
            if (element.textContent === randomQ.correct) {
                score++;
                numberCorrect.textContent = score;
                answerChoice[i].removeEventListener("click", fn); // ***
                makeQuestion();                     // resets text content of HTML
            } else {
                answerChoice[i].removeEventListener("click", fn); // ***
                makeQuestion();                     // resets text content of HTML
            }    
        };
        answerChoice[i].addEventListener("click", fn);
    }
}


















function setFinalStyling() {
    // renders final styles on page to display final score and final game form
    questions.remove();     //removes questionBank
    
    // make final input form visible;
    finalInputForm.style.visibility = "visible";

    // show final score
    finalScoreValue.textContent = score;

    // set timer to display final message
    timerElement.textContent = "No Time Remaining!";
}


// starts with invisible questions and final input form, when start button is clicked, questions become visible and a question appears
questions.style.visibility = "hidden";
finalInputForm.style.visibility = "hidden";
timerElement.style.visibility = "hidden"

startBtn.addEventListener('click', function(event) {
        //button becomes invisible upon click
        startBtn.style.visibility = "hidden";

        //questions become visible upon click
        questions.style.visibility = "visible";

        //timer becomes visible
        timerElement.style.visibility = "visible";

        //put question on user interface and starts the game
        makeQuestion();

        //start game timer
        timer();
});


/////START HERE. record output to localStorage
// submit button functionality
submissionForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // create object with user information
    var userInfo = {
        name: userName.value,
        userScore: score
    }

    // get array of current datafrom localStorage or an empty array if nothing stored in localStorage
    var storedData = JSON.parse(localStorage.getItem("userInfo") || "[]");
    
    // insert current userInfo into storedData
    // userInfo.push(storedData);

    // sort items in storedData in descending order by their 'score' value .sort().reverse()
                        // var arrayCarObjects = [
                        //     {brand: "Honda",        topSpeed: 45},
                        //     {brand: "Ford",         topSpeed: 6},
                        //     {brand: "Toyota",       topSpeed: 240},
                        //     {brand: "Chevrolet",    topSpeed: 120},
                        //     {brand: "Ferrari",      topSpeed: 1000}
                        //     ];
                        // arrayCarObjects.sort((a, b) => (a.topSpeed - b.topSpeed)).reverse();


    // remove last item from array (.pop())
    storedData.pop();

    // set storedData back into local storage
    // localStorage.setItem("userInfo", JSON.stringify(storedData));

    //go to highscores page
    submitBtn.addEventListener("click", function() {
        location.href = "highscore.html";
    });
    

});



var quizTitle = document.getElementById('quiz');
var listenerExists = false;

quizTitle.addEventListener("click", function() {
    console.log('title click');
    listenerExists = true;
    console.log('Listener Exists?: ',listenerExists);
});



