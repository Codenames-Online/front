function setupSocket() {
	// Create WebSocket connection - TODO: unhard code this
	// socket = new WebSocket('ws://localhost:3000');
	if(window.location.host.indexOf('localhost') > -1) //if on localhost
		socket = new WebSocket('ws://localhost:8000');
	else
		socket = new WebSocket('ws://codenames-backend.herokuapp.com/');

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
			goToLobbyRegistration();
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
		case "invalidClueWord":
			invalidClueWord(message.reason);
			break;
		case "invalidClueNum":
			invalidClueNum();
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
		case "endGame":
			gameOver(message.team);
			break;
		default:
			console.log(`Whoops, don't know action: ${message.action}`);
	}
}
