// jQuery function for conveniently handling pressing enter on a field
$.fn.enterPress = function (callback) {
	this.keypress(function (event) {
		if (event.which == 13) // Enter keycode
			callback();
	});
};

<<<<<<< HEAD
// Setter function for when the current user is provided
function setMe(newMe) {
	me = newMe;

	// Set the team as an HTML attribute for CSS
	$('body').attr('user-team', me.team);
=======
function setMe(newMe) { me = newMe; }

function isMyTurn(turn, color) {
	return me.team === color && me.role === turn;
>>>>>>> cf2fe44cb5d61ac8ca62d99b465f33619207c175
}