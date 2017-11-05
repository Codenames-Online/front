// @param teams - {blue: [String], red: [String]} contains two arrays of String names
function updateRoster(teams) {
	var blueRoster = teams.blue; //.sort();
	var redRoster = teams.red; //.sort();

	// Clear old rosters by clearing all player objects in rosters
	$('.players .player').remove()

	for(var i = 0; i < blueRoster.length; i++) {
		appendToRoster('blue', blueRoster[i].name);
	}
	
	for(var i = 0; i < redRoster.length; i++) {
		appendToRoster('red', redRoster[i].name);
	}

	function appendToRoster(team, name) {
		$('.roster.' + team + ' .players').append(
			`<div class="player ${(me && name === me.name) ? "self" : "" }">` + name + '</div>');
	}
}

function switchRosterTeam() {
	sendSocket({ action: "switchTeam" });
}

function goToGame() {
	$('.roster-page-cont').fadeOut(function() {
		$('.game-page-cont').fadeIn();
	});

	sendSocket({action: 'startGame' });
}

// Gets a boolean from the backend saying if we have enough people to start
function setGameReady(ready) {
	$('#start-game').attr('disabled', ready);
}