//function to generate starting screen
var card = document.querySelector(".card");





var questionArray = [
    ["Comonly used data types DO NOT include:", "1. Strings", "false", "2. Booleans", "false", "3. Alerts", "true", "4. Numbers", "false"],
    ["The condition in and if/else statement is enclosed withing ______:", "1. Quotes", "false", "2. Curly brackets", "false", "3. Parentheses", "true", "4. Square brackets", "false"],
    ["String values must be enclosed within _____ when being assigned to variables.", "1. Commas", "false", "2. Curly brackets", "false", "3. Quotes", "true", "4. Parentheses", "false"],
    ["Arrays in JavaScript can be used to store _____.", "1. Numbers and strings", "false", "2. Other arrays", "false", "3. Booleans", "false", "4. All of the above", "true"],
    ["A very useful tool used during development and debuggin for printing content to the debugger is:", "1. JavaScript", "false", "2. Terminal/bash", "false", "3. For loops", "false", "4. Console.log", "true"]
]

var lastAnswerState = "";
var timer;
var timerCount = 75;
var timerDisplay = document.querySelector(".display-timer");
timerDisplay.textContent = "Time: 75";
var finalScore;





function generateStart () {
    card.innerHTML = "";

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

    var startScreenButton = document.querySelector("#start-quiz");
    startScreenButton.addEventListener("click", function(){

        generateQuiz(0);
        startTimer(); 

    })
}
generateStart(); 



//function to cycle through quiz screens
    //function to create/append elements
    //function to set attributes

function generateQuiz (questionNumber){
    card.innerHTML = "";

    var quizDiv= document.createElement("div");
    quizDiv.setAttribute("class","quiz-screen");
    card.appendChild(quizDiv);

    var quizHeader = document.createElement("h1");
    quizHeader.textContent = questionArray[questionNumber][0];
    quizDiv.appendChild(quizHeader);

    var quizButtonDiv =document.createElement("div");
    quizButtonDiv.setAttribute("id", "quiz-screen-buttons")
    quizDiv.appendChild(quizButtonDiv);

    for (var x=1; x < 9; x = x +2){
        var counter = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"]
        counter[x] = document.createElement("button");
        counter[x].textContent = questionArray[questionNumber][x];
        counter[x].setAttribute("data-boolean", questionArray[questionNumber][x+1]);
        quizButtonDiv.appendChild(counter[x]);
    }

    var quizScreenButtons = document.querySelector("#quiz-screen-buttons");
    quizScreenButtons.addEventListener("click", function(event) {
        var element = event.target;

        if (element.matches("button")) {
            var state = element.getAttribute("data-boolean");

            if (state == "true") {
                lastAnswerState = "Correct!";
                if (questionNumber + 1 < questionArray.length){
                    generateQuiz(questionNumber+1);
                } else {
                    finalScore = timerCount;

                    clearInterval(timer);
                    generateEnd();
                }
                
                
            } else {
                lastAnswerState = "Wrong!";
                timerCount = timerCount - 20;
                if (questionNumber + 1 < questionArray.length){
                    generateQuiz(questionNumber+1);
                } else {
                    finalScore = timerCount;
                    clearInterval(timer);
                    generateEnd();
                }
            }
        }
    })

    var quizLastAnswer = document.createElement("p");
    quizLastAnswer.setAttribute("class", "last-answer");
    quizLastAnswer.textContent = lastAnswerState;
    quizDiv.appendChild(quizLastAnswer);
    
 
}
// generateQuiz(4);






//function to generate end screen
function generateEnd () {
    card.innerHTML = "";

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

    var initialInput = document.querySelector("input");
    var initialSubmit = document.querySelector("button");

    initialSubmit.addEventListener("click", function(event){
        var initialText = initialInput.value.trim();
        if (initialText === "") {
            return;
        }

        var finalScoreArray = [];
        finalScoreArray.push(initialText);
        finalScoreArray.push(finalScore); 

        localStorage.setItem("highScores", JSON.stringify(finalScoreArray));
    })

    
}
// generateEnd();


function startTimer(){
    timer = setInterval(function(){
        timerCount--;
        timerDisplay.textContent = "Time: " + timerCount;
        if (timerCount === 0){
            clearInterval(timer);
            generateEnd();
        }
    }, 1000);
}



// function startQuiz () {
//     generateStart();
//     var startScreenButton = document.querySelector("#start-quiz");

//     startScreenButton.addEventListener("click", function(){

//         generateQuiz(0);
//         startTimer(); 

//     })
// }
// // startQuiz(); 

















        // i = 0;
        // generateQuiz(i);
        // var quizScreenButtons = document.querySelector("#quiz-screen-buttons");
        // quizScreenButtons.addEventListener("click", function(event){
        //     var element = event.target;
        //     if (element.matches("button")){
        //         var state = element.getAttribute("data-boolean");
        //         if (state == "true") {
        //             lastAnswerState = "true";
        //             i++;
        //             generateQuiz(i);
        //         } else {
        //             lastAnswerState = "false";
                    
        //         }
        //        console.log(lastAnswerState);
        //     }
             
        // })


        // for (var i = 0; i < questionArray.length; i = i+0) {
        //     generateQuiz(i);
        //     var quizScreenButtons = document.querySelector("#quiz-screen-buttons");

        //     quizScreenButtons.addEventListener("click", function(event) {
        //         var element = event.target;

        //         if (element.matches("button")) {
        //             var state = element.getAttribute("data-boolean");

        //             if (state == "true") {
        //                 lastAnswerState = "true";
        //                 i++;
        //             } else {
        //                 lastAnswerState = "false";
        //                 i++;
        //             }
        //         }
        //     })
        // }
