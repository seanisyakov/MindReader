var answers = [];


// http://git.wimbarelds.nl/TimeCircles/
$("#DateCountdown").TimeCircles({
    "animation": "smooth",
    "bg_width": 1.2,
    "fg_width": 0.1,
    "circle_bg_color": "#60686F",
    "time": {
        "Days": {
            "text": "Days",
            "color": "#FFCC66",
            "show": false
        },
        "Hours": {
            "text": "Hours",
            "color": "#99CCFF",
            "show": false
        },
        "Minutes": {
            "text": "Minutes",
            "color": "#BBFFBB",
            "show": true
        },
        "Seconds": {
            "text": "Seconds",
            "color": "#FF9999",
            "show": true
        }
    }
});

// Tells code not to keep counting after one
$("#DateCountdown").TimeCircles({count_past_zero: false}); 

// Send all the answers back to the server
$("#DateCountdown").TimeCircles().addListener(function(unit, amount, total){
	if(total == 0) {
		$.ajax(
		{
			type: "POST",
			url: "/api",
			data: JSON.stringify(answers),
			dataType: "json",
			success: 
				function(data, status){
	     	 	window.location.replace('/thanks');
	    	},
	    error: 
				function(data, status){
	     	 	window.location.replace('/thanks');
	     	 	// console.log(data);
	    	}
		}); 
    

	}
});

// Replace the char with whatever you want to format the premise. 
// Use the replace function
var json_str = $('#my-data').data().name;
var question = $('#question').data().name;

// Not valid json string b/c using ' instead of "
// This took so long !! :( library - jquery needed a different format
json_str = json_str.split('\'').join('\"');

// First random question on screen
question = question.split('\'').join('\"');

question = $.parseJSON(question);
var questions = $.parseJSON(json_str);

// Change the inital text of to have random audience member and question number
var rand = Math.floor(Math.random()*120);
var rand2 = Math.floor(Math.random()*400);

$("#premise").text("Premise: " + question.premise.replace("<",rand).replace("#",rand2));
$("#conclusion").text("Conclusion " + question.conclusion.replace("<",rand).replace("#",rand2));


// Initialize slider object
$( "#slider" ).slider({
  change: function( event, ui ) {},
  slide: function( event, ui ) {}
});

// Starting value of the slider
$( "#slider" ).slider( "value", 50 );
// Display the number of the slider
$( "#slider" ).on( "slide", 
    function( event, ui ){
        $("#slideView").text($("#slider").slider("value"));
    } 
);

// When they submit a question

// api.jqueryui.com/slider
$("#submit").click(function() {
	// Get next element to show. It is okay if it has been already shown
    // needed to floor because javascript random is a float
	var new_question = questions[Math.floor(Math.random()*questions.length)];
	// Replace the chars appropriately in the new question
	var rand = Math.floor(Math.random()*120);
	var rand2 = Math.floor(Math.random()*400);

	console.log(new_question.premise);
	console.log(new_question.conclusion);

	$("#premise").text("Premise: " + new_question.premise.replace("<",rand).replace("#",rand2));
	$("#conclusion").text("Conclusion " + new_question.conclusion.replace("<",rand).replace("#",rand2));

	// get the slider value
	var selection = $("#slider").slider("value");
	answer = {};
	// creates dictionary
	answer["logical_id"] = question.logical_id;
	answer["rating"] = selection;
	// Changes json to string so it can be in post request
	answer = answer;
	// adds string to the list
	answers.push(answer);
	console.log(answer);
	// Set slider back to default value
	$( "#slider" ).slider( "value", 50 );

	// update the question variable
	question = new_question;

});
