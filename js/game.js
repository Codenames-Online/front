function goToGame() {
	$('.roster-page-cont').fadeOut(function() {
		$('.game-page-cont').fadeIn();
	});	
}

function sendMessage() {
	var message = $('.send-msg input').val();
	socket.send({ action: "sendMessage", message: message });
}

function addMessage(message, name, team) {
	let teamString = team === RED ? "red" : "blue";
	let maybeSelf = name === me.name ? ' data-self="true"' : "";
	$('.chat .msg-cont').append(
		`<div class="msg" data-team="${teamString}"${maybeSelf}>
			<div class="body">${message}</div>
			<div class="author">${name}</div>
		</div>`
	);
}

<div class="msg" data-team="red">
	<div class="body">Lorem ipsum dolor sit amet.</div>
	<div class="author">Jane</div>
</div>