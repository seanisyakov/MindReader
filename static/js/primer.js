$("#secondPrompt").toggle();
$("#start").toggle();
var json_str = $('#my-data').data().name;
var question = $('#question').data().name;


var score = 0;

// Not valid json string b/c using ' instead of "
// This took so long !! :( library - jquery needed a different format
json_str = json_str.split('\'').join('\"');
question = question.split('\'').join('\"');

question = $.parseJSON(question);
var questions = $.parseJSON(json_str);

function successHandle(){
    if(score == 5){
        // Delete the previous prompt, and the premise question
        $("#initPrompt").toggle();
        $("#secondPrompt").toggle();
        $("#start").toggle();
        $("#prompt").toggle();
        $("#buttonOptions").toggle();
    }
}

// When they submit a question
$("#true").click(function() {
    // Get next element to show. It is okay if it has been already shown
    // needed to floor because javascript random is a float
    var new_question = questions[Math.floor(Math.random()*questions.length)];
    // Replace the chars appropriately in the new question
    $("#premise").text("Question: " + new_question.premise);

    if(question.answer == "True"){
        score++;
        successHandle();
    }

    question = new_question;
});

$("#false").click(function() {
    // Get next element to show. It is okay if it has been already shown
    // needed to floor because javascript random is a float
    var new_question = questions[Math.floor(Math.random()*questions.length)];
    // Replace the chars appropriately in the new question
    $("#premise").text("Question: " + new_question.premise);

    if(question.answer == "False"){
        score++;
        successHandle();
    }
    question = new_question;
});

$("#skip").click(function() {
    // Get next element to show. It is okay if it has been already shown
    // needed to floor because javascript random is a float
    var new_question = questions[Math.floor(Math.random()*questions.length)];
    // Replace the chars appropriately in the new question
    $("#premise").text("Premise: " + new_question.premise);
    $("#answer").text("Answer: " + new_question.answer);

});