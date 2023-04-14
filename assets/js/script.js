const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["1. <js>", "2. <scripting>", "3. <javascript>", "4. <script>"],
        answer: "4. <script>"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "How do you create a function in JavaScript",
        choices: ["1. function = myFunction()", "2. function myFunction()", "3. function:myFunction()", "4. createMyFunction()"],
        answer: "2. function myFunction()"
    },
    {
        question: "How do you call a function named myFunction?",
        choices: ["1. call myFunction()", "2. call function myFunction()", "3. myFunction()", "4. call myFunction"],
        answer: "3. myFunction()"
    },
    {
        question: "The condition in an if / else statement is enclosed with ____.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "The first index of an array is ____.",
        choices: ["1. 0", "2. 1", "3. 8", "4. any"],
        answer: "1. 0"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choices: ["1. if i == 5 then", "2. if i = 5 then", "3. if(i == 5)", "4. if i = 5"],
        answer: "3. if(i == 5)"
    },
    {
        question: "How do you add a comment in a JavaScript?",
        choices: ["1. //This is a comment", "2. <!--This is a comment-->", "3. 'This is a comment", "4. * This is a comment *"],
        answer: "1. //This is a comment"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: ["1. onclick", "2. onchange", "3. onmouseover", "4. onmouseclick"],
        answer: "1. onclick"
    },
    {
        question: "A very useful too used during development and debugging for printing content to the dubgger is:",
        choices: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choices: ["1. The <head> section", "2. The <body> section", "3. Both the <head> and <body> section", "4. neither"],
        answer: "3. Both the <head> and <body> section"
    }
];


var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");
var questionContainer = document.getElementById("question-container");
var questionTitle = document.getElementById("questionTitle");
var choice1 = document.getElementById("btn0");
var choice2 = document.getElementById("btn1");
var choice3 = document.getElementById("btn2");
var choice4 = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");
var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var quizContainer = document.getElementById("quiz-container");
var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

var totalTime = 120;
function newQuiz() {
    questionIndex = 0;
    totalTime = 120;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionContainer.style.display = "block";
    timer.style.display = "block";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choice1.textContent = questions[questionIndex].choices[0];
    choice2.textContent = questions[questionIndex].choices[1];
    choice3.textContent = questions[questionIndex].choices[2];
    choice4.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "inline-block";
    lineBreak.style.margin = "auto";
    lineBreak.style.width = "50vw";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // correct answer, add 1 score to final score
        correctAns++;
        answerCheck.textContent = "Correct!";
    } else {
        // wrong answer, deduct 10 second from timer
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // Checks if any questions are left, otherwise ends game.
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        timer.textContent = totalTime;
        scoreResult = totalTime;
        gameOver();
    }
}

function choose1() { checkAnswer(0); }

function choose2() { checkAnswer(1); }

function choose3() { checkAnswer(2); }

function choose4() { checkAnswer(3); }

// Game is over when all questions answered or timer is zero.
function gameOver() {
    summary.style.display = "block";
    questionContainer.style.display = "none";
    startDiv.style.display = "none";
    // Shows final score
    finalScore.textContent = scoreResult;
}

// enter initial and store highscore in local storage
function storeHighScores(event) {
    event.preventDefault();

    // stop function is initial is blank
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // store scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    scoresArray.push(userScore);

    // stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // show current highscores
    showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionContainer.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }


    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

/**
 * ADD EVENT LISTENERS
 */

startQuizBtn.addEventListener("click", newQuiz);
choice1.addEventListener("click", choose1);
choice2.addEventListener("click", choose2);
choice3.addEventListener("click", choose3);
choice4.addEventListener("click", choose4);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});

