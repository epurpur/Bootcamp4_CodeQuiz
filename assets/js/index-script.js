
/**
 * DECLARING VARIABLES
 */

// declaring variables for HTML elements needed to interact with
var questionTitle = document.getElementById("question-title");
var answerChoice = document.querySelectorAll(".answer-choice");
var numberCorrect = document.getElementById("number-correct");
var questions = document.getElementById("question-bank");
var startBtn = document.getElementById("btn-newGame");
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
var timeleft = 30;




/**
 * DECLARING FUNCTIONS
 */


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


function evaluateUserChoice(randomQ) {
    // takes random question created from makeQuestion()
    // evaluates if user clicks on correct answer or not
    // This logic is broken. Currently only works if user chooses correct answer
    
    if (timeleft > 0) {                                                         //checks if there is still time left on the clock
        for (var i = 0; i < answerChoice.length; i++) {                         //iterate through answer choices
            answerChoice[i].addEventListener("click", function(event) {         //add event listener to each answer choice
                var element = event.target;                                     //element = what the user clicks on
                if (element.textContent === randomQ.correct) {                  //checking to see if user choice is correct
                    score++;                                                    //increment score by 1
                    numberCorrect.textContent = score;                          //set textContent of numberCorrect to the value of current score
                    if (questionBank.length > 0) {                              //if there are any questions remaining in the questionBank
                        if (timeleft > 0) {                                     //check is there is still time left on the clock
                            makeQuestion();                                     //make new question
                        }
                    } else {                                                    //if there are no questions remaining in the questionBank
                        setFinalStyling();                                      //set final styles of page; 
                    }
                }    
            });
        }
    } else {                                                                    //if no time remaining, skip straight to final styling upon click
        setFinalStyling();
    }
}


function setFinalStyling() {
    // renders final styles on page to display final score and final game form
    questions.remove();             //removes questionBank
    
    // make final input form visible;
    finalInputForm.style.visibility = "visible";

    // show final score
    finalScoreValue.textContent = score;

    // set timer to display final message
    timerElement.textContent = "No Time Remaining!";
}


/**
 * DECLARING STYLES AND EVENT LISTENERS
 */


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
    storedData.push(userInfo);

    // sort items in storedData in descending order by their 'score' value
    // Because my logic is broken and all scores are 7, this is meaningless. But it would work if correct gameplay logic was in place
    storedData.sort((a, b) => (a.userScore - b.userScore)).reverse()

    // If more than 5 items in array, remove last item which is lowest score
    if (storedData.length > 5) {
        storedData.pop()
    } 

    //go to highscores page
    submitBtn.addEventListener("click", function() {

        // set storedData back into local storage
        localStorage.setItem("userInfo", JSON.stringify(storedData));

        location.href = "highscore.html";
    });
});






