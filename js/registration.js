function goToRoster() {
	if(!$('#register').hasClass('disabled')) { // only continue if button is enabled
		var name = $('.registration-page-cont input').val();
		sendSocket({ action: "setName", name: name });

		$('.registration-page-cont').fadeOut(function() {
			$('.roster-page-cont').fadeIn();
		});
	}
}

function checkEnteredName() {
	var name = $('.registration-page-cont input').val();
	
	if(name.length > 0)
		$('#register').removeClass('disabled');
	else
		$('#register').addClass('disabled');
}


