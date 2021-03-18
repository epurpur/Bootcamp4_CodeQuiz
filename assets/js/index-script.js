
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

/** holds all questions used in the quiz. Stores an array of objects. Each question is an object.
 *  Each question has three properties:
 *              qTitle: title of question
 *              answers: an array of answer choices
 *              correct: the correct answer choice              
 */             
var questionBank = [
    {qTitle:"What is the name of a container for storing a data value in Javascript?", answers: ["element", "variable", "document", "viewport"], correct: "variable"},
    {qTitle:"In javascript, what is an ordered list of values called?", answers: ["array", "object", "loop", "html"], correct: "array"},
    // {qTitle:"What is the name for the language used to describe the presentation of a document?", answers: ["html", "javascript", "css", "python"], correct: "css"},
    // {qTitle:"What is the name of the version control software we use in this course?", answers: ["bitbucket", "vs code", "terminal", "git"], correct: "git"},
    // {qTitle:"Which layout tool allows us easy, flexible design of our html elements?", answers: ["javascript", "flexbox", "css", "github"], correct: "flexbox"},
    // {qTitle:"What property of the window object allows us to save information, even after a browser refresh?", answers: ["getItem", "textContent", "addEventListener", "localStorage"], correct: "localStorage"},
    // {qTitle:"In javascript, what is the name for a reusable piece of code written to perform a specific task?", answers: ["function", "object", "string", "variable"], correct: "function"}
]

//accumulator variable which counts correct answer choices
score = 0;


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
    
    //answer is evaluated
    evaluateUserChoice(randomQ);

}


function evaluateUserChoice(randomQ) {
    // takes random question created from makeQuestion()
    // evaluates if user clicks on correct answer or not

    for (var i = 0; i < answerChoice.length; i++) {
        answerChoice[i].addEventListener("click", function(event) {
            var element = event.target;
            //checking to see if user choice is correct
            if (element.textContent === randomQ.correct) {
                score++;
                numberCorrect.textContent = score;
                if (questionBank.length > 0) {   //if there are any questions remaining in the questionBank
                    makeQuestion();   //make next question
                } else {                         //if there are no questions remaining in the questionBank
                    setFinalStyling();   //set final styles of page; 
                }
            }    //HERE I SHOULD BE ABLE TO RUN makeQuestion(); 
        });
    }
}


function setFinalStyling() {
    // renders final styles on page to display final score and final game form
    questions.remove();     //removes questionBank
    
    // make final input form visible;
    finalInputForm.style.visibility = "visible";

    // show final score
    finalScoreValue.textContent = score;
}


// starts with invisible questions and final input form, when start button is clicked, questions become visible and a question appears
questions.style.visibility = "hidden";
finalInputForm.style.visibility = "hidden";
startBtn.addEventListener('click', function(event) {
        console.log('clicked');    
        //button becomes invisible upon click
        startBtn.style.visibility = "hidden";

        //questions become visible upon click
        questions.style.visibility = "visible";

        //put question on user interface and starts the game
        makeQuestion();
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





