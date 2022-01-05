// ****** Set of prompts ******

const questionsSet = [
    'A simple one - how is your day going? In more than three words though, please.',
    'If you have siblings, don\'t deny it, you must have a favorite. Who is your favorite? If not, a favorite cousin?',
    'Any interesting new discoveries today?',
    'Any funny memes you have seen today?',
    'Have you made any regretted purchases lately?',
    'Now, on the topic of aliens... do you believe they exist?',
    'Do you have any movies you can watch over and over again?',
    'Here is a good one - what makes you angry?',
    'Let\'s get a bit nostalgic. What were some of the most cozy places in your childhood?',
    'Any personality quirks in other people that you feel drawn to?',
    'Imagine a friend just found out their partner is cheating on them. What would be your response? What advice would you give them?',
    'What or who has made you laugh today? If nothing, what are you going to do right now to make yourself laugh?',
    'How much of a rebel against your parents are you? Are you making any life choices they strongly disagree with?',
    'Who doesn\'t like lists. How do you rank these in the order of importance at work: status, money, creativity, colleagues, impact?',
    'Are you currently working on changing anything in your life?',
    'If you weere to write a book, what would it be about?'
];

const lastResponse = "Wow! You're on a roll! I've run out of questions! Come back again tomorrow!' P.S. Can you tell how excited I am based on the number of exclamation marks?"

let questions = [...questionsSet];


// ****** Scripts ******


/* Code for user interaction with the page:
    + On click of send  button, creates a variable with user input text
    + Puts that variale in a new div tag
    + Appends the div
    + Clears text input area
*/
const handleInput = () => {
    let $textInput = $("#textInput").val();
    
    let $chatDiv = $("<div class=\"chatMsg\">");
    $("#chat").append($chatDiv);
    $chatDiv.html($textInput);

    $("#textInput").val("");
};


/* Code for webpage side of converstation:
    + On click of send button, create a variable with a random question from the questions list
    + Updates questions list removing question already asked
    + Puts question asked in a new div
    + Appends the new div with a delay (to replicate a real conversation) to the chat
*/
const handleQuestion = () => {
    let questionIndex = Math.floor(Math.random()*(questions.length));
    let randQuestion = questions[questionIndex];
    questions = questions.filter((_, index) => {
        return index !== questionIndex;
    });

    let $answerDiv = $("<div class=\"answerMsg\">");
    $("#chat").append($answerDiv);
    if(randQuestion !== undefined){
        $answerDiv.html(randQuestion);
    } else {
        $answerDiv.html(lastResponse);
    }
};

// Code to create time and date stamps for user and bot
const addUserDateTime = () => {
    const date = new Date();
    const dateString = date.toLocaleString('en-GB');
    let $timeDiv = $("<div class=\"userTime\">");
    $("#chat").append($timeDiv);
    $timeDiv.html(dateString);
};

const addBotDateTime = () => {
    const date = new Date();
    const dateString = date.toLocaleString('en-GB');
    let $timeDiv = $("<div class=\"botTime\">");
    $("#chat").append($timeDiv);
    $timeDiv.html(dateString);
};

// Code for executing conversation:
$("#sendButton").on("click", () => {
    handleInput();
    addUserDateTime();
    setTimeout(() => {
        handleQuestion();
        addBotDateTime();
        $("#chat").scrollTop($("#chat")[0].scrollHeight);
    }, 500);
});

// Code to let enter trigger click event
// Source: https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
$("#textInput").keyup(function(event) {
    console.log('triggered enter');
    if (event.keyCode === 13) {
        $("#sendButton").click();
    }
});
