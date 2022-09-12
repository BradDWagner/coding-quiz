//create variable for space where all HTML will be generated
var card = document.querySelector(".card");
//add link functionality to Highscores link
var highScoreLink = document.querySelector(".highscores");
highScoreLink.addEventListener("click", function(){
    generateHighScores();
    clearInterval(timer);
})

var lastAnswerState = "";
var timer;
var timerCount = 75;
var timerDisplay = document.querySelector(".display-timer");
timerDisplay.textContent = "Time: 75";
var finalScore;
var highScoreArray = [];


//Array containing arrays of text data for quiz questions. Each nested array contains prompt at the 0 index, button options at the odd indexes, and true/false data on subsequent even indexes
var questionArray = [
    ["Comonly used data types DO NOT include:", "1. Strings", "false", "2. Booleans", "false", "3. Alerts", "true", "4. Numbers", "false"],
    ["The condition in and if/else statement is enclosed withing ______:", "1. Quotes", "false", "2. Curly brackets", "false", "3. Parentheses", "true", "4. Square brackets", "false"],
    ["String values must be enclosed within _____ when being assigned to variables.", "1. Commas", "false", "2. Curly brackets", "false", "3. Quotes", "true", "4. Parentheses", "false"],
    ["Arrays in JavaScript can be used to store _____.", "1. Numbers and strings", "false", "2. Other arrays", "false", "3. Booleans", "false", "4. All of the above", "true"],
    ["A very useful tool used during development and debuggin for printing content to the debugger is:", "1. JavaScript", "false", "2. Terminal/bash", "false", "3. For loops", "false", "4. Console.log", "true"]
]

//function to generate starting screen
function generateStart () {
    card.innerHTML = "";
    timerCount = 75;

    //create HTML elements for start screen
    var startDiv = document.createElement("div");
    startDiv.setAttribute("class", "start-screen");
    card.appendChild(startDiv);

    var startHeader = document.createElement("h1");
    startHeader.textContent = "Coding Quiz Challenge";
    startDiv.appendChild(startHeader);

    var startP = document.createElement("p");
    startP.textContent = "Try to answer the following code-related questions within th time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!";
    startDiv.appendChild(startP);

    var startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    startButton.setAttribute("id", "start-quiz")
    startDiv.appendChild(startButton);

    //add event listener to start button which calls first question and starts timer
    var startScreenButton = document.querySelector("#start-quiz");
    startScreenButton.addEventListener("click", function(){

        generateQuiz(0);
        startTimer(); 

    })
}

//function to start the timer.
function startTimer(){
    timer = setInterval(function(){
        timerCount--;
        
        //if timer reaches zero it is stopped and count set to 0
        if (timerCount <= 0){
            clearInterval(timer);
            timerCount = 0; 
            generateEnd();
        }

        timerDisplay.textContent = "Time: " + timerCount;
    }, 1000);
}

//function to generate quiz questions. The questionNumber parameter will refer to which array within the questionArray to use
function generateQuiz (questionNumber){
    card.innerHTML = "";

    //create HTML
    var quizDiv= document.createElement("div");
    quizDiv.setAttribute("class","quiz-screen");
    card.appendChild(quizDiv);

    var quizHeader = document.createElement("h1");
    quizHeader.textContent = questionArray[questionNumber][0];
    quizDiv.appendChild(quizHeader);

    var quizButtonDiv =document.createElement("div");
    quizButtonDiv.setAttribute("id", "quiz-screen-buttons")
    quizDiv.appendChild(quizButtonDiv);

    //use a for loop to create each of the four buttons. cycles through the questionsArray to insert corresponding values
    for (var x=1; x < 9; x = x +2){
        button = document.createElement("button");
        button.textContent = questionArray[questionNumber][x];
        button.setAttribute("data-boolean", questionArray[questionNumber][x+1]);
        quizButtonDiv.appendChild(button);
    }

    //add event listener
    var quizScreenButtons = document.querySelector("#quiz-screen-buttons");
    quizScreenButtons.addEventListener("click", function(event) {
        var element = event.target;

        //refrence the true/false data stored on each button
        if (element.matches("button")) {
            var state = element.getAttribute("data-boolean");

            //if true, sets the lastAnswerState variable to Correct and cycles to the next question if there is one, otherwise the end screen is generated
            if (state == "true") {
                lastAnswerState = "Correct!";
                if (questionNumber + 1 < questionArray.length){
                    generateQuiz(questionNumber+1);
                } else {
                    generateEnd();
                }
                
            //if answer is incorrect changes lastAnswerState to Wrong. 
            } else {
                lastAnswerState = "Wrong!";

                //if there is more than 20s left on the timer, it is reduces by 20s for a wrong answer and the next question is generated if there is on. If there is fewer than 20s remaining, time count is set to 0 and the end screen is generated
                if (timerCount >= 20) {
                    timerCount = timerCount - 20;

                    if (questionNumber + 1 < questionArray.length){
                        generateQuiz(questionNumber+1);
                    } else {
                        generateEnd();
                    }
                    
                } else {
                    timerCount = 0; 
                    generateEnd();
                }
                
            }
        }
    })

    //using the lastAnswerState variable displays a bit of text to inform the user if the last answer was right or wrong 
    var quizLastAnswer = document.createElement("p");
    quizLastAnswer.setAttribute("class", "last-answer");
    quizLastAnswer.textContent = lastAnswerState;
    quizDiv.appendChild(quizLastAnswer);

    //clears out the last answer info after 1s
    setTimeout(function() {
        quizDiv.removeChild(quizLastAnswer);
        lastAnswerState = "";
    }, 1000);
}

//function to generate end screen
function generateEnd() {
    card.innerHTML = "";
    finalScore = timerCount;
    clearInterval(timer);
    timerDisplay.textContent = "Time: " + timerCount;

    //create HTML elements
    var endDiv = document.createElement("div");
    endDiv.setAttribute("class", "end-screen");
    card.appendChild(endDiv);

    var endHeader = document.createElement("h1");
    endHeader.textContent = "All done!";
    endDiv.appendChild(endHeader);

    var endP = document.createElement("p");
    endP.setAttribute("id", "display-score");
    endP.textContent = "Your final score is " + finalScore;
    endDiv.appendChild(endP);

    var endForm = document.createElement("form");
    endDiv.appendChild(endForm);

    var endFormLabel = document.createElement("label");
    endFormLabel.setAttribute("class", "input-label");
    endFormLabel.setAttribute("for", "initial-form");
    endFormLabel.textContent = "Enter initials:";
    endForm.appendChild(endFormLabel);

    var endFormInput = document.createElement("input");
    endFormInput.setAttribute("type", "text");
    endFormInput.setAttribute("id", "initial-form");
    endForm.appendChild(endFormInput);

    var endFormButton = document.createElement("button");
    endFormButton.setAttribute("type", "button");
    endFormButton.textContent = "Submit";
    endForm.appendChild(endFormButton);

    var endLastAnswer = document.createElement("p");
    endLastAnswer.setAttribute("class", "last-answer");
    endLastAnswer.textContent = lastAnswerState;
    endDiv.appendChild(endLastAnswer);

    //removes the last answer state message after 1s
    setTimeout(function() {
        endDiv.removeChild(endLastAnswer);
    }, 1000);

    var initialInput = document.querySelector("input");
    var initialSubmit = document.querySelector("button");

    //collects input of the users initials from the form element, adds it to the users final score and stores it in the highScoreArray, and takes the user to the highScores screen
    initialSubmit.addEventListener("click", function(event){
        var initialText = initialInput.value.trim();
        
        if (initialText === "") {
            return;
        }

        highScoreArray.push(initialText.toUpperCase() + " - " + finalScore)
        generateHighScores();
    })

    
}

//function to generate Highscores screen
function generateHighScores (){

    card.innerHTML = "";
    //set the highScoreArray to local storage
    localStorage.setItem("highScores", JSON.stringify(highScoreArray));

    //create HTML elements
    var HighScoreDiv = document.createElement("div");
    HighScoreDiv.setAttribute("class", "highscores-screen");
    card.appendChild(HighScoreDiv);

    var HighScoreHeader = document.createElement("h1");
    HighScoreHeader.textContent = "High Scores";
    HighScoreDiv.appendChild(HighScoreHeader);

    var HighScoreOl = document.createElement("ol");
    HighScoreDiv.appendChild(HighScoreOl);

    //create a li for each set of scores stored in the highScoreArray
    for (var i = 0; i < highScoreArray.length; i++) {
      
        var li = document.createElement("li");
        li.textContent = highScoreArray[i];

        HighScoreOl.appendChild(li);
    }

    //create button to play again, and reset starting values
    var returnButton = document.createElement("button");
    returnButton.setAttribute("type", "button");
    returnButton.textContent = "Go Back";
    HighScoreDiv.appendChild(returnButton);
    returnButton.addEventListener("click", function(){
        lastAnswerState = "";
        timerCount = 75;
        generateStart();
    })

    //create button to clear the highScores for the highScoreArray and localStorage and regenerate the screen
    var clearButton = document.createElement("button");
    clearButton.setAttribute("type", "button");
    clearButton.textContent = "Clear Highscores";
    HighScoreDiv.appendChild(clearButton);
    clearButton.addEventListener("click", function(){
        highScoreArray = [];
        localStorage.clear();
        generateHighScores();
    })

}

//function to initialize the page. retrieves highScore data from localStorage and stores it in the highScoreArray, and calls the generateStart function
function init() {
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedHighScores !== null) {
        highScoreArray = storedHighScores;
    }
    generateStart();
}
init();
