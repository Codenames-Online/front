var me, socket;

$(document).ready(function() {
	setupSocket();
	$('.registration-page-cont .btn').click(goToRoster);
});

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
	
	}
}

function goToRoster() {
	var name = $('.registration-page-cont input').val();
	socket.send({ action: "setName", name: val });
}

// @param teams - {blue: [String], red: [String]} contains two arrays of String names
function updateRoster(teams) {
	var blueRoster = teams.blue.sort();
	var redRoster = teams.red.sort();

	// Clear old rosters by clearing all player objects in rosters
	$('.players .player').remove()

	for(var i = 0; i < blueRoster.length; i++) {
		appendToRoster('blue', blueRoster[i]);
	}
	
	for(var i = 0; i < redRoster.length; i++) {
		appendToRoster('red', redRoster[i]);
	}

	function appendToRoster(team, name) {
		if(me && name == me.name)
			$('.roster.' + team + ' .players').append('<div class="player self">' + name + '</div>');
		else
			$('.roster.' + team + ' .players').append('<div class="player">' + name + '</div>');
	}
}