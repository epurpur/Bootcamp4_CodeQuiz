// /**
//  * DECLARING VARIABLES
//  */

// declaring variables for HTML elements needed to interact with
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
 var questionList = [
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
var timeleft = 45;


// /**
//  * DECLARING FUNCTIONS
//  */

function randomQuestion() {
    // chooses random question from questionList
    var randomQ = questionList[Math.floor(Math.random() * questionList.length)]
    return randomQ;
}


function makeHTML() {
    //Makes HTML for a new question when start button clicked
        
    var timerEl = document.getElementById('timer-element');

    //make HTML for new section
    var questionBank = document.createElement('section');
    questionBank.id = ('question-bank');
    //insert questionBank after timerEl
    timerEl.after(questionBank);

    //make html for question title and insert into questionBank
    var questionTitle = document.createElement('p');

    questionTitle.id = "questionTitle"
    questionTitle.innerHTML = 'This is where all the content will go describing the quiz';
    questionBank.appendChild(questionTitle);

    //add ordered list within questionBank, after question title
    var answersList = document.createElement('ol');
    answersList.id = 'answers-list';
    questionTitle.after(answersList);

    //create each li for all questions within answersList. Makes 4 answer choices
    for (var i = 0; i < 4; i++) {
        var answerChoice = document.createElement('li');
        answerChoice.className = 'answer-choice';
        answerChoice.innerHTML = `Answer ${i + 1}`;
        answersList.appendChild(answerChoice);
    }

    //add scoreboard at bottom of section
    var scoreboard = document.createElement('p');
    answersList.after(scoreboard);
    scoreboard.id = 'scoreboard';
    scoreboard.innerHTML = 'Score: <span id="number-correct">0</span>';   //add number-correct span within scoreboard

}


function setAnswersText(randomQ) {
    // sets textContent of each answer choice to text content of random question from questionList
    // set title text of random question
    questionTitle.textContent = randomQ.qTitle;

    // variable holding textContent of span tag within scoreboard
    var numberCorrect = document.getElementById('number-correct');
    numberCorrect.textContent = score;


    // need to grab all answer choices as their html did not previously exist
    allAnswerChoices = document.querySelectorAll('.answer-choice');

    //sets text content of each answer choice to value of corresponding index of random question answers
    for (var i = 0; i < allAnswerChoices.length; i++) {
        allAnswerChoices[i].textContent = randomQ.answers[i];
    }

    // remove question from questionList so that it is not asked again
    qIndex = questionList.indexOf(randomQ);
    questionList.splice(qIndex, 1);

    return allAnswerChoices
}


function evaluateUserChoice(allAnswerChoices, randomQ) {
    // attaches event handler to each answer choice
    // evaluates user choice if it is correct or not
    for (var i = 0; i < allAnswerChoices.length; i++) {                     
        allAnswerChoices[i].addEventListener("click", function(event) {         //add event listener to each answer choice
            var element = event.target;                                         
            if (element.textContent == randomQ.correct) {                       //evaluate if user chose correct choice
                console.log('correct');
                score++;
                removeHTML();
                main();
            } else {
                console.log('incorrect')
                timeleft -= 5;                                                  //decrement 5 on timer for wrong answer
                removeHTML();
                main();
            }
        })
    }
}


function removeHTML() {
    //removes HTML generated by makeHTML() function, scraps all of it

    var mainEl = document.querySelector('main');
    var questionBank = document.getElementById('question-bank');

    questionBank.remove();

}


function setFinalStyling() {
    // renders final styles on page to display final score and final game form
    
    // make final input form visible;
    finalInputForm.style.visibility = "visible";

    // show final score
    finalScoreValue.textContent = score;

    // set timer to display final message
    timerElement.textContent = "Game Over!";
}


function timer() {
    // starts timer countdown starting from value of timeLeft
    var countDown = setInterval(function() {
        timeleft--;
        timeCount.textContent = timeleft;

        if (timeleft <= 0) {
            clearInterval(countDown);   // stops at 0
            timerElement.textContent = "Make final choice and game will end!";
        }
    }, 1000);    //counts in milliseconds. 1000ms = 1second
}


function main() {
    // main function which controls flow of game
    
    if (timeleft > 0) {                                                 //if there is still time on the clock
        if (questionList.length > 0) {                                  //if there are questions remaining in questionsList
            makeHTML();                                                 //make HTML of questions bank from scratch
            var randomQ = randomQuestion()                              //generates random question from questionsList
            var allAnswerChoices = setAnswersText(randomQ);             //set text of question and answers in HTML
            evaluateUserChoice(allAnswerChoices, randomQ);              //evaluates user answer choice if its correct or not
        } else {
            setFinalStyling();                                          //goes to submission form
        }
    } else {
        setFinalStyling();                                              //goes to submission form
    }
}


/**
 * DECLARING STYLES AND EVENT LISTENERS
 */

// starts with invisible questions and final input form, when start button is clicked, questions become visible and a question appears
finalInputForm.style.visibility = "hidden";
timerElement.style.visibility = "hidden"

startBtn.addEventListener('click', function(event) {
        //button becomes invisible upon click
        startBtn.style.visibility = "hidden";

        //timer becomes visible
        timerElement.style.visibility = "visible";

        //put question on user interface and starts the game
        main();

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