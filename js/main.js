var me, socket;

$(document).ready(function() {
	setupSocket();
	$('.registration-page-cont .btn').click(goToRoster);
	$('.registration-page-cont input').enterPress(goToRoster);
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
		case "updateLoiterer":
			setMe(message.person);
			break;
		default:
			console.log(`Whoops, don't know action: ${message.action}`);
	}
}

function goToRoster() {
	var name = $('.registration-page-cont input').val();
	socket.send({ action: "setName", name: name });

	$('.registration-page-cont').fadeOut(function() {
		$('.roster-page-cont').fadeIn();
	});
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
		$('.roster.' + team + ' .players').append(
			`<div class="player ${(me && name === me.name) ? "self" : "" }">` + name + '</div>');
	}
}

function setMe(newMe) { me = newMe; }

function switchRosterTeam() {
	socket.send({ action: "switchTeam" });
}

// jQuery function for conveniently handling pressing enter on a field
$.fn.enterPress = function (callback) {
	this.keypress(function (event) {
		if (event.which == 13) // Enter keycode
			callback();
	});
};