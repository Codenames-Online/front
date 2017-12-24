function goToLobbyRegistration() {
	$('.registration-page-cont').hide();
	$('.lobby-registration-page-cont').show();
}

function createLobby() {
	try {
		sendSocket({ action: "createLobby" });
	}
	catch(error) {
		console.error(error);
		showOverlay('websocket-error');
	}
}

function joinLobby() {
	if(!$('#joinLobby').hasClass('disabled')) { // only continue if button is enabled
		var lobby = $('.lobby-registration-page-cont input').val();
		lobby = escapeHtml(lobby); // escape name for safety

		try {
			sendSocket({ action: "joinLobby", gid: lobby });
		}
		catch(error) {
			console.error(error);
			showOverlay('websocket-error');
		}
	}
}

function goToRoster() {
	$('.lobby-registration-page-cont').hide();
	$('.roster-page-cont').show();
}
