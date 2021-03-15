
// declaring variables for HTML elements needed to interact with
var questionTitle = document.querySelector('#question-title');
var answerChoice = document.querySelectorAll('.answer-choice');
var correctAnswers = document.querySelector('#number-correct');

/** holds all questions used in the quiz. Stores an array of objects. Each question is an object.
 *  Each question has three properties:
 *              qTitle: title of question
 *              answers: an array of answer choices
 *              correct: the correct answer choice              
 */             
var questionBank = [
    {qTitle:"What is the name of a container for storing a data value in Javascript?", answers: ["element", "variable", "document", "viewport"], correct: "variable"},
    {qTitle:"In javascript, what is an ordered list of values called?", answers: ["array", "object", "loop", "html"], correct: "A2"},
    {qTitle:"What is the name for the language used to describe the presentation of a document?", answers: ["html", "javascript", "css", "python"], correct: "css"},
    {qTitle:"What is the name of the version control software we use in this course?", answers: ["bitbucket", "vs code", "terminal", "git"], correct: "git"},
    {qTitle:"Which layout tool allows us easy, flexible design of our html elements?", answers: ["javascript", "flexbox", "css", "github"], correct: "flexbox"},
    {qTitle:"What property of the window object allows us to save information, even after a browser refresh?", answers: ["getItem", "textContent", "addEventListener", "localStorage"], correct: "localStorage"},
    {qTitle:"What is the term for a reusable piece of code in javascript?", answers: ["function", "object", "string", "variable"], correct: "function"}
]

//accumulator variable which counts correct answer choices
correctAnswers = 0;


function randomQuestion() {
    // chooses random question from questionBank
    var randomQ = questionBank[Math.floor(Math.random() * questionBank.length)]
    return randomQ;
}



// generates random question to get data about
var randomQ = randomQuestion()

// set title text of random question
questionTitle.textContent = randomQ.qTitle;

//sets text content of each answer choice to value of corresponding index of random question answers
for (var i = 0; i < answerChoice.length; i++) {
    answerChoice[i].textContent = randomQ.answers[i];
}


// checks to see if user has clicked correct answer
// need to iterate over them because I am selecting all elements in class answer-choice
for (var i = 0; i < answerChoice.length; i++) {
    answerChoice[i].addEventListener("click", function(event) {
        var element = event.target;
        //checking to see if the user choise is correct
        if (element.textContent == randomQ.correct) {
            console.log('correct!');

            //update correct answers    #####START HERE
            correctAnswers++;
            correctAnswers.textContent = correctAnswers;

        }
    })
}




