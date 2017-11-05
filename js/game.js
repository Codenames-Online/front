// Takes in [[color, Card],[color,Card]]
// Each card is {word: string, votes: string[], revealed: boolean}
// Colors are of form `{0: blue, 1: red, 2: bystander, 3: assassin}`
function drawBoard(board) {
	// Clear board
	$('.board .card').remove();

	var currCard, currColor, $card, $iconCont;

	for(var i = 0; i < board.length; i++) {
		currColor = board[i][0];
		currCard = board[i][1];

		// Add each card using the word
		$('.board').append('<div class="card selectable" data-index="' + i + '">' +
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

	$('.board .card').click(selectCard);
}

function setScore(score) {
	$('.score.red').html(score[1]);
	$('.score.blue').html(score[0]);
}

function changeTurn(team) {
	setHeader(team);
	$('.board').attr('data-team', getTeamString(team));
}

function sendMessage() {
	var message = $('.send-msg input[type="text"]').val();
	sendSocket({ action: 'sendMessage', text: message });
	$('.send-msg input[type="text"]').val('');
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

	// Scroll to bottom
	$(".msg-cont").scrollTop($(".msg-cont")[0].scrollHeight);
}

function setHeader(team, clue) {
	$('.clue').attr('data-team', getTeamString(team));
	$('.clue').html(getHeader(team, clue));
}

// Shows the dialog for the spymaster to enter a clue
function showClueInput() {
	$('.clue').html('<div class="center">' +
		'Give a one word clue: <input type="text" id="clue-word"> ' +
		'# of cards: <input type="number" id="clue-num"> <div class="btn green" id="clue-submit">Submit</div>' +
	'</div>');

	$('#clue-submit').click(sendClue);
}

// Reads in the spymaster fields and sends a clue action
function sendClue() {
	var data = {
		clue: { word: $('#clue-word').val(), num: $('#clue-num').val() },
		action: 'sendClue'
	}

	sendSocket(data);
}

// Occurs if spymaster tries to submit invalid clue
function invalidClue() {
	showOverlay('not-in-dict');
}

// Shows the panel for submitting a guess
function showGuessPanel(team, clue) {
	setHeader(team, clue);
	
	if(me.team == team && me.role == OP)
		$('.guess-panel').show();
	else
		$('.guess-panel').hide();
}

function selectCard() {
	sendSocket({ action: "selectCard", cardIndex: $(this).attr('data-index') });
}