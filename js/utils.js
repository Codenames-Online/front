// jQuery function for conveniently handling pressing enter on a field
$.fn.enterPress = function (callback) {
	this.keypress(function (event) {
		if (event.which == 13) // Enter keycode
			callback();
	});
};

// Setter function for when the current user is provided
function setMe(newMe) {
	me = newMe;

	// Set the team as an HTML attribute for CSS
	if(me.team === BLUE)
		$('body').attr('user-team', 'blue');
	else if(me.team === RED)
		$('body').attr('user-team', 'red');

	// Update name in header
	$('header .name').text(me.name);

	// Update role in header
	if(me.role == SPY) {
		$('body').attr('user-role', 'spymaster');
		$('header .role').text('Spymaster');
	}
	else if(me.role == OP) {
		$('body').attr('user-role', 'operative');
		$('header .role').text('Operative');
	}
}

function isMyTurn(turn, color) { return me.team === color && me.role === turn; }

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTeamString(team, upper) {
	let teamString = team === 0 ? "blue" : "red";
	return upper ? capitalizeFirstLetter(teamString) : teamString;
}

function getHeader(team, clue) {
	let teamInfo = `<span class="team">${getTeamString(team, true)} Team</span>`;
	let headerMessage = clue
		? ` guessing on <span class="clue-word">${clue.word}</span> for <span class="guesses">${clue.num} cards</span><div class="right"><span class="guess-counter">${clue.guesses}</span> guesses left</div>`
		: ` spymaster is working on a clue`;

	return teamInfo + headerMessage;
}

// Sends a socket message with some given data (should include an action)
function sendSocket(data) {
	if(me) // if user object exists (if signed)
		data['id'] = me.id; // add the user's ID

	socket.send(JSON.stringify(data));
}