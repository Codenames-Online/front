function setupSocket() {
	// Create WebSocket connection - TODO: unhard code this

	if(window.location.host === 'viktorkoves.com')
		socket = new WebSocket('ws://35.202.27.167/game');
	else
		socket = new WebSocket(`ws://${window.location.hostname}:3000`);

	// Connection opened
	socket.addEventListener('open', function (event) {});

	// Listen for messages
	socket.addEventListener('message', function (event) {
		console.log('Message from server ', event.data);

		handleMessage(JSON.parse(event.data));
	});
}

function handleMessage(message) {
	switch(message.action) {
		case "updateTeams":
			updateRoster(message.teams);
			break;
		case "updateLoiterer":
			setMe(message.person);
			goToRoster();
			break;
		case "sendMessage":
			addMessage(message.text, message.playerName, message.playerTeam);
			break;
		case "switchTurn":
			changeTurn(message.team);
			break;
		case "postClue":
			console.log("Clue" + JSON.stringify(message.clue));
			showGuessPanel(message.team, message.clue);
			break;
		case "promptForClue":
			showClueInput();
			break;
		case "toggleStartButton":
			setGameReady(message.enable);
			break;
		case "updateScore":
			setScore(message.score);
			break;
		case "updateBoard":
			drawBoard(message.board);
			break;
		case "updateLoitererToPlayer":
			goToGame();
			setMe(message.player);
			break;
		case "invalidClue":
			invalidClue();
			break;
		case "allowGuess":
			allowGuess(message.bool);
			break;
		case "switchActiveTeam":
			changeTurn(message.team);
			break;
		case "gameStarted":
			setHeader(message.startTeam);
			setupTeamRoster(message.roster);
			break;
		default:
			console.log(`Whoops, don't know action: ${message.action}`);
	}
}
