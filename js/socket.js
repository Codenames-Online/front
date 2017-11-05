function setupSocket() {
	// Create WebSocket connection - TODO: unhard code this
	socket = new WebSocket(`ws://${window.location.hostname}:3000`);

	// Connection opened
	socket.addEventListener('open', function (event) {
			// socket.send({ greeting: 'Hello Server!'});
	});

	// Listen for messages
	socket.addEventListener('message', function (event) {
		console.log('Message from server ', event.data);
		
		handleMessage(event.data);
	});
}

function handleMessage(message) {
	// TODO: Maybe parse?
	switch(message.action) {
		case "updateTeams":
			updateRoster(message.teams);
			break;
		case "updateLoiterer":
			setMe(message.person);
			break;
		case "addMessage":
			addMessage(message.message, message.name, message.team);
			break;
		default:
			console.log(`Whoops, don't know action: ${message.action}`);
	}
}
