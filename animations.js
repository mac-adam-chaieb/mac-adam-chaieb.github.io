/*****************************************************
*
*	Designed and programmed by Mohamed Adam Chaieb.
*
*****************************************************/

//elements to add
var $name = $("<h1 id='name'>Mohamed Adam Chaieb</h1>");
var $pic = $("<img id='profile' src='./profile.jpg'></img>");
var $header = $("<p id='head'>I like to hack things.</p>");
var $bar = $("<div id='bar'><a href='https://www.linkedin.com/in/mohamedadamchaieb'><i class='fa fa-linkedin-square'></i></a>"
	+ "<a href='mailto:mohamed.chaieb@mail.mcgill.ca'><i class='fa fa-envelope'></i></a>"
	+ "<a href='./resume.pdf'><i class='fa fa-file-text'></i></a>"
	+ "<a href='https://github.com/mac-adam-chaieb'><i class='fa fa-github-square'></i></a></div>");
var $shell = $("<textarea id='shell' spellcheck='false'>Welcome to the Moe Shell! "+new Date()
	+ "\nEnter 'help' to get a list of commands"
	+ "\nmoeshell> </textarea>");

//the index of
var shellOffset = 0;
var lineOffset = 11;
var shell;

$(document).ready(function() {
	$(".button").click(function() {
		$('.button').fadeOut(300);
		$('#greeting').fadeOut(300, removeElements);
	});

	$shell.keydown(function(e) {
		console.log("Line offset: "+lineOffset)
		console.log("Shell offset: "+shellOffset)
		if(e.keyCode === 13) { //ENTER
			e.preventDefault();
			shellOffset += 11;
			lineOffset = 10;
			setCaret();
			execute();
			shell.value += "\nmoeshell> ";
		} else if (e.keyCode === 37) { //LEFT
			e.preventDefault();
			shellOffset--;
			lineOffset--;
			if(lineOffset <= 10) {
				shellOffset++;
				lineOffset++;
			};
			setCaret();
		} else if (e.keyCode === 8) { //ESCAPE
			e.preventDefault();
			shellOffset--;
			lineOffset--;
			if(lineOffset <= 10) {
				shellOffset++;
				lineOffset++;
				setCaret();
			} else shell.value = shell.value.substring(0, shellOffset-1);
		} else {
			shellOffset++;
			lineOffset++;
		};
	});

	$shell.click(function() {
		console.log(shellOffset)
		//if()
		setCaret();
		//set the caret index
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
		$('body').append($shell);
		$("#shell").fadeIn(500);
		shell = document.getElementById("shell");
		shellOffset = shell.value.length;
	});
	$('#profile').css("display", "block");
};

/*
	Executes when the user presses enter
*/
var execute = function() {

};

(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaret () {
  setSelectionRange(document.getElementById("shell"), shellOffset, shellOffset);
}