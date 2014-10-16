var titles = ['Hacker', 'McGill Student', 'Co-Founder of HackMcGill', 'Floor Fellow at McConnell Hall', 'Basketball Fan', 'Aspiring Entrepreneur', 'Bassist'];

/*
	Terminal indices
*/
var shellOffset = 0;
var lineOffset = 10;

$(document).ready(function(){
    $(".mytitle").typed({
      strings: titles,
      typeSpeed: 60,
      loop: true,
      startDelay: 200,
      backDelay: 1500,
      showCursor: false
    });

    var $shell = $("#shell");
	var shell = document.getElementById("shell");

	shell.value = "Welcome to the Moe Shell! "+new Date()
	+ "\nEnter 'help' to get a list of commands"
	+ "\nmoeshell> ";

	shellOffset = shell.value.length;

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

		if(!(e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32 || e.keyCode == 39))
			e.preventDefault();
	});

	$shell.click(function() {
		setCaret();
	});
});

/*
	Executes when the user presses enter
*/
window.execute = function() {
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
				urlopen("http://themoe.me/resume.pdf");
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
	shellOffset = shell.value.length+10;
};

/*
	Helper methods
*/

window.urlopen = function(url) {
  window.open(url,'_blank');
};

window.setSelectionRange = function(input, selectionStart, selectionEnd) {
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
};

window.setCaret = function() {
  setSelectionRange(shell, shellOffset, shellOffset);
};