function goToGame() {
	$('.roster-page-cont').fadeOut(function() {
		$('.game-page-cont').fadeIn();
	});	
}

// Takes in {cards: Card[], colors: number[], startTeam: team}
// Each card is {word: string, votes: string[], revealed: boolean}
// Colors are of form `{0: blue, 1: red, 2: bystander, 3: assassin}`
function drawBoard(board) {
	// Clear board
	$('.board .card').remove();

	var currCard, currColor, $card, $iconCont;
	
	for(var i = 0; i < board.cards.length; i++) {
		currCard = board.cards[i];
		currColor = board.colors[i];

		// Add each card using the word 
		$('.board').append('<div class="card selectable">' +
			'<span>' + currCard.word + '</span>' +
			'<div class="overlay">' +
				'<div class="icon-cont"></div>' +
			'</div>' +
		'</div>');

		$card = $('.board .card').last(); // store card we just insterted

		// Add selection by class .selected and appending div.team-select or div.self-select into .overlay .icon-cont
		if(currCard.votes.length > 0) {
			$card.addClass('selected');
			$iconCont = $card.find('.icon-cont');

			// iterate through votes and add proper icon
			for(var v = 0; v < currCard.votes.length; v++) {
				if(currCard.votes[v] == me.name)
					$iconCont.prepend('<div class="self-select"></div>')
				else
					$iconCont.prepend('<div class="team-select"></div>')
			}
		}
	
		// Add data-agent for colors and data-revealed to revealed cards
		if(currColor == BLUE)
			$card.attr('data-agent', 'blue');
		else if(currColor == RED)
			$card.attr('data-agent', 'red');
		else if(currColor == ASSASSIN)
			$card.attr('data-agent', 'black');
		else if(currColor == NEUTRAL)
			$card.attr('data-agent', 'neutral');

		if(currCard.revealed)
			$card.attr('data-revealed', 'true')
	}
	
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