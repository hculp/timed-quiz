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
        choices: ["1. if i == 5 then", "2. if i = 5 then", "3. if (i == 5)", "4. if i = 5"],
        answer: "3. if (i == 5)"
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

// Get and set container elements
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var startContainer = document.getElementById("start");
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


var questionNum = 0;
var scoreResult;
var questionIndex = 0;
var totalTime = 130;

// Starts quiz
function newQuiz() {
    questionIndex = 0;
    totalTime = 130;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startContainer.style.display = "none";
    questionContainer.style.display = "block";
    timer.style.display = "block";

    var startTimer = setInterval(function() {
        timeLeft.textContent = totalTime;
        totalTime--; 
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
            gameOver();
        }
        if (questionIndex > questions.length - 1) {
            clearInterval(startTimer);
            gameOver();
        }
    },1000);

    showQuiz();
};

// Shows next quiz con
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
    // Displays line break and adds style elements
    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "inline-block";
    lineBreak.style.margin = "auto";
    lineBreak.style.width = "40vw";
    // The checked answer text (correct/wrong) display is turned on
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // Display correct is answer is correct
        answerCheck.textContent = "Correct!";
    } else {
        // Display wrong if answer is wrong
        // Deducts 10 seconds off timer for a wrong answer
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong!";
    }

    questionIndex++;
    // Checks if any questions are left or timer hits zero in order to end game.
    if (questionIndex < questions.length) {
        nextQuestion();
    } else if (totalTime<=0) {
        timeLeft.textContent = 0;
        scoreResult = 0;        
        gameOver();
    } else {
        scoreResult = totalTime;
        gameOver();
    }
}

// When the user selects and answer, that answer is then passed for checking
function choose1() { checkAnswer(0); }

function choose2() { checkAnswer(1); }

function choose3() { checkAnswer(2); }

function choose4() { checkAnswer(3); }

// Game is over when all questions answered or timer is zero.
function gameOver() {
    summary.style.display = "block";
    questionContainer.style.display = "none";
    startContainer.style.display = "none";
    // Shows final score
    finalScore.textContent = scoreResult;
}

// Enter initial and store highscore into local storage
function storeHighScores(event) {
    event.preventDefault();

    // Alerts user to put valid input before backing out
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startContainer.style.display = "none";
    timer.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // Gets scores stored into into local storage
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

    // Stores scores in local storage
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // Then shows high scores
    showHighScores();
}

// Shows high scores
var i = 0;
function showHighScores() {

    startContainer.style.display = "none";
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

// Event listeners
// Quiz selections
startQuizBtn.addEventListener("click", newQuiz);
choice1.addEventListener("click", choose1);
choice2.addEventListener("click", choose2);
choice3.addEventListener("click", choose3);
choice4.addEventListener("click", choose4);

// Start quiz listener
submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

// View High Scores listener
viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

// Back button from high scores page listener
goBackBtn.addEventListener("click", function() {
    startContainer.style.display = "block";
    highScoreSection.style.display = "none";
});

// Clear all high scores listener
clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});

