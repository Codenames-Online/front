function goToRoster() {
	var name = $('.registration-page-cont input').val();
	socket.send({ action: "setName", name: name });

	$('.registration-page-cont').fadeOut(function() {
		$('.roster-page-cont').fadeIn();
	});
}

