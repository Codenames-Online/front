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
	$('body').attr('user-team', me.team);
}

function isMyTurn(turn, color) {
	return me.team === color && me.role === turn;
}

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
		? ` guessing on: <span class="clue-word">${clue.word}</span>. Remaining guesses: <span class="guesses">${clue.guesses}</span>`
		: ` spymaster is working on a clue`;

	return teamInfo + headerMessage;
}