/*****************************************************
*
*	Designed and programmed by Mohamed Adam Chaieb.
*
*****************************************************/

/*
	jQuery elements
*/
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
var shell;

/*
	Terminal indices
*/
var shellOffset = 0;
var lineOffset = 10;

$(document).ready(function() {
	$(".button").click(function() {
		$('.button').fadeOut(300);
		$('#greeting').fadeOut(300, removeWelcome);
	});

	$shell.keydown(function(e) {
		if(e.keyCode === 13) { //ENTER
			execute();
			lineOffset = 10;
			setCaret();
			shell.value += "moeshell> ";
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

/*
	Removes the greeting and start button, loads the profile
*/
var removeWelcome = function() {
	$(".button").remove();
	$("#greeting").remove();
	loadProfile();
};

/*
	Load profile elements
*/
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
	// If there is something to parse
	if(cmd.length > 0) {
		//Match the command, perform an action, set the output
		switch(cmd) {
			case "hello":
				out = "\nWelcome to the Moe Shell! How are you?\n";
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
					+ "\ndate	  Prints out the date and time\n";
				break;
			case "github":
				out = "\nOpening gihub profile...\n";
				urlopen("https://github.com/mac-adam-chaieb");
				break;
			case "linkedin":
				out = "\nOpening LinkedIn page...\n";
				urlopen("https://www.linkedin.com/in/mohamedadamchaieb");
				break;
			case "email":
				out += "\nEmails:\nmohamed.chaieb@mail.mcgill.ca\nmac@hackmcgill.com\n"
				break;
			case "date":
				out += "\n"+new Date()+"\n";
				break;
			case "resume":
				out = "\nOpening resume...\n";
				urlopen("http://themoechaieb.com/resume.pdf");
				break;
			case "clear":
				shell.value = "";
				out = "";
				break;
			case "exit":
				window.close();
				break;
			default:
				out = "\nCommand not found. Enter 'help' for a list of commands\n";
				break;
		};
		if(cmd.indexOf("echo") === 0)
			out = "\n"+cmd.substring(cmd.indexOf("echo")+5, cmd.length)+"\n";	
	// Otherwise just skip a line
	} else out = "\n";
	shell.value += out;
	shellOffset = shell.value.length+11;
};

/*
	Helper methods
*/

function urlopen(url) {
  window.open(url,'_blank');
}

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