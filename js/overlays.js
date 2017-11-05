function showOverlay(id) {
	$(".window-overlay, #" + id).fadeIn();
}

function closeOverlay() {
	$(".window-overlay, .overlay-msg").fadeOut();
}