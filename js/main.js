$(document).ready(function() {

	/////////////////////////////////////////////////////////////////////////////////
	// GLOBALS
	/////////////////////////////////////////////////////////////////////////////////

	var speed = 300;
	var fails = 0;
	var max_fails = 6;
	var character = 'a';
	var word = "abc";

	/////////////////////////////////////////////////////////////////////////////////
	// INITIALISE
	/////////////////////////////////////////////////////////////////////////////////

	setHangman(fails);
	buildKeypad();
	buildWord();

	/////////////////////////////////////////////////////////////////////////////////
	// LOGIC
	/////////////////////////////////////////////////////////////////////////////////

	function setHangman(fails) {
		$("#hangman img").remove();
		$("#hangman").append('<img src="images/hangman_' + fails + '.jpg">');
		if(fails == max_fails) {
			$("#game_box").css("background-color", "#e20000");
			$(".subtitle").css("color", "#fff");
		}
	}

	function nextChar(c) {
	    return String.fromCharCode(c.charCodeAt(0) + 1);
	}

	function buildKeypad() {
		for(var i = 0; i < 26; i++) {
			$("#keypad").append('<div class="character">' + character + '</div>');
			character = nextChar(character);
		}
	}

	function buildWord() {
		for(var i = 0; i < word.length; i++) {
			$("#word").append('<div class="character_slot undiscovered"><span class="character">' + word.charAt(i) + '</span></div>');
		}
		$("#word").css("left", ($("#game_box").width() / 2) - $("#word").width() / 2);
	}

	function checkWord(character) {

		// word.indexOf(character) >= 0 ? console.log("correct") : console.log("wrong");

		if(word.indexOf(character) >= 0) {
			$("#word .character_slot").each(function(i) {
				if(character == $(this).text()) {
					$(this).removeClass("undiscovered").find(".character").css("opacity", "1");
				}
			});
			// If the word is completed:
			if(!$("#word .undiscovered").length) {
				$("#winface").show();
				word = "def";
			}
		} else {
			setHangman(++fails);
		}

	}

	$("#keypad .character").on("click", function() {
		if(!$(this).hasClass("disabled")) {
			$(this).fadeTo(speed, 0.1).addClass("disabled");
			$("#graveyard").append('<div class="character">' + $(this).text() + '</div>');
			checkWord($(this).text());
		}
	});

	// Reset the game:
	$("#winface").on("click", function() {
		setHangman(0);
		fails = 0;
		$("#keypad .character").removeClass("disabled").css("opacity","1");
		$("#word").html("");
		$("#graveyard").html("");
		$("#winface").hide();
		buildWord(word);
	});

});



























