/**
 * Code for the registration page/section, which is the first screen that the
 * user sees, and is responsible for registering them to a team via the name
 * they enter into the text input field.
 */

function registerName() {
	if(!$('#register').hasClass('disabled')) { // only continue if button is enabled
		var name = $('.registration-page-cont input').val();
		name = escapeHtml(name); // escape name for safety

		try {
			sendSocket({ action: "setName", name: name });
		}
		catch(error) {
			console.error(error);
			showOverlay('websocket-error');
		}
	}
}

function checkEnteredName() {
	var name = $('.registration-page-cont input').val();

	if(name.length > 0)
		$('#register').removeClass('disabled');
	else
		$('#register').addClass('disabled');
}

function checkEnteredLobby() {
	var lobby = $('.lobby-registration-page-cont input').val();

	if(lobby.length > 0)
		$('#joinLobby').removeClass('disabled');
	else
		$('#joinLobby').addClass('disabled');
}

