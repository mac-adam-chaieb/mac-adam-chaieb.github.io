/*****************************************************
*	Designed and programmed by Mohamed Adam Chaieb.
*****************************************************/

//elements to add
var $name = $("<h1 id='name'>Mohamed Adam Chaieb</h1>");
var $pic = $("<img id='profile' src='./profile.jpg'></img>");
var $header = $("<p id='head'>I like to hack things.</p>");
var $bar = $("<div id='bar'><a href='https://www.linkedin.com/in/mohamedadamchaieb'><i class='fa fa-linkedin-square fa-4x'></i></a>"
	+ "<a href='https://github.com/mac-adam-chaieb'><i class='fa fa-github-square fa-4x'></i></a>"
	+ "<a href='https://twitter.com/AngryAlgerian'><i class='fa fa-twitter-square fa-4x'></i></a></div>");

$(document).ready(function() {
	$(".button").click(function() {
		$('.button').fadeOut(300);
		$('#greeting').fadeOut(300, removeElements);
	});
});

//removes the greeting and start button, loads the profile
var removeElements = function() {
	$(".button").remove();
	$("#greeting").remove();
	loadProfile();
};

//load profile elements
var loadProfile = function() {
	$('body').append($pic);
	$('body').append($name);
	$('#profile').fadeIn(500, function() {
		$('#name').fadeIn(500);
		$('body').append($header);
		$('body').append($bar);
		$('#bar').fadeIn(500);
		$('#bar').css("display", "block");
	});
	$('#profile').css("display", "block");
};