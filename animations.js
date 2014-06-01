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
var lineOffset = 10;
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
			execute();
			lineOffset = 10;
			setCaret();
			shell.value += "\nmoeshell> ";
			shell.scrollTop = shell.scrollHeight;
		} else if (e.keyCode === 37) { //LEFT
			shellOffset--;
			lineOffset--;
			if(lineOffset <= 10) {
				shellOffset++;
				lineOffset++;
			};
			setCaret();
		} else if (e.keyCode === 8) { //ESCAPE
			shellOffset--;
			lineOffset--;
			if(lineOffset <= 10) {
				shellOffset++;
				lineOffset++;
				setCaret();
			} else shell.value = shell.value.substring(0, shellOffset-1);
		} else if(e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32){ //alphanumeric, punctuation, or space
			shellOffset++;
			lineOffset++;
		};

		if(!(e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32))
			e.preventDefault();
	});

	$shell.click(function() {
		setCaret();
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
	var cmd = shell.value.substring(shell.value.lastIndexOf("moeshell> ")+10, shell.value.length);
	var out = "";
	if(cmd.length > 0) {
		switch(cmd) {
			case "hello":
				out = "\nWelcome to the Moe Shell! How are you?";
				break;
			case "help":
				out = "\nCommands:"
					+ "\nhello	  Greeting"
					+ "\nhelp	  Displays a list of commands"
					+ "\ngithub    Opens my github profile"
					+ "\nlinkedin  Opens my LinkedIn profile"
					+ "\nresume    Opens my resume"
					+ "\nemail	  Prints out my email"
					+ "\nclear	  Clears the terminal"
					+ "\necho	  Prints the argument to standard output"
					+ "\ndate	  Prints out the date and time";
				break;
			case "github":
				out = "\nOpening gihub profile...";
				urlopen("https://github.com/mac-adam-chaieb");
				break;
			case "linkedin":
				out = "\nOpening LinkedIn page...";
				urlopen("https://www.linkedin.com/in/mohamedadamchaieb");
				break;
			case "email":
				out += "\nEmails:\nmohamed.chaieb@mail.mcgill.ca\nmac@hackmcgill.com"
				break;
			case "date":
				out += "\n"+new Date();
				break;
			case "resume":
				out = "\nOpening resume...";
				urlopen("file:///home/moe/Hacking/Projects/mac-adam-chaieb.github.io/resume.pdf");
				break;
			case "clear":
				shell.value = "";
				out = "Welcome to the Moe Shell! "+new Date()
					+ "\nEnter 'help' to get a list of commands";
				break;
			case "exit":
				window.close();
				break;
			default:
				out = "\nCommand not found. Enter 'help' for a list of commands";
				break;
		};
		if(cmd.indexOf("echo") === 0)
			out = "\n"+cmd.substring(cmd.indexOf("echo")+5, cmd.length);	
	};
	shell.value += out;
	shellOffset = shell.value.length+11;
	console.log(cmd);
};

function urlopen(url) {
  window.open(url,'_blank');
}

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