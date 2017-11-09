/**
 * Code for the registration page/section, which is the first screen that the
 * user sees, and is responsible for registering them to a team via the name
 * they enter into the text input field.
 */

function goToRoster() {
	$('.registration-page-cont').hide();
	$('.roster-page-cont').show();
}

function registerName() {
	if(!$('#register').hasClass('disabled')) { // only continue if button is enabled
		var name = $('.registration-page-cont input').val();

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


