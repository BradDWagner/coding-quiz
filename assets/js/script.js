//function to generate starting screen
var card = document.querySelector(".card");



function generateStart () {
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
}
// generateStart(); 

var questionArray = [
    ["Comonly used data types DO NOT include:", "1. Strings", "false", "2. Booleans", "false", "3. Alerts", "true", "4. Numbers", "false"],
    ["The condition in and if/else statement is enclosed withing ______:", "1. Quotes", "false", "2. Curly brackets", "false", "3. Parentheses", "true", "4. Square brackets", "false"]
]

function generateQuiz (questionNumber){
    var quizDiv= document.createElement("div");
    quizDiv.setAttribute("class","quiz-screen");
    card.appendChild(quizDiv);

    var quizHeader = document.createElement("h1");
    quizHeader.textContent = questionArray[questionNumber][0];
    quizDiv.appendChild(quizHeader);

    var quizButtonDiv =document.createElement("div");
    quizDiv.appendChild(quizButtonDiv);

    for (x=1; x < 9; x = x +2){
        var counter = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"]
        counter[x] = document.createElement("button");
        counter[x].textContent = questionArray[questionNumber][x];
      
        counter[x].setAttribute("data-boolean", questionArray[questionNumber][x+1]);
        quizButtonDiv.appendChild(counter[x]);
    }

    var quizLastAnswer = document.createElement("p");
    quizLastAnswer.setAttribute("class", "last-answer");
    quizDiv.appendChild(quizLastAnswer);
 
}
generateQuiz(1);

//function to cycle through quiz screens
    //function to create/append elements
    //function to set attributes

//function to generate end screen

