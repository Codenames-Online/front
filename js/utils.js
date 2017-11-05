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