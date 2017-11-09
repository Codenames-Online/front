// @param teams - {blue: [String], red: [String]} contains two arrays of String names
function updateRoster(teams) {
	var blueRoster = teams.blue.sort();
	var redRoster = teams.red.sort();

	// Clear old rosters by clearing all player objects in rosters
	$('.roster-page-cont .players .player').remove()

	for(var i = 0; i < blueRoster.length; i++) {
		appendToRoster('blue', blueRoster[i]);
	}

	for(var i = 0; i < redRoster.length; i++) {
		appendToRoster('red', redRoster[i]);
	}

	function appendToRoster(team, name) {
		$('.roster-page-cont .roster.' + team + ' .players').append(
			`<div class="player ${(me && name === me.name) ? "self" : "" }">` + name + '</div>');
		
		if(me && name == me.name) {
			if(team == "blue")
				me.team = BLUE;
			if(team == "red")
				me.team = RED;

			setMe(me);
		}
	}
}

function switchRosterTeam() {
	sendSocket({ action: "switchTeam" });
}

function goToGame() {
	if($('.game-page-cont:hidden').length > 0) {
		$('.roster-page-cont').hide();
		$('.game-page-cont').fadeIn();
	}
}

function startGameClick() {
	if(!$('#start-game').hasClass('disabled')) { // if button is not disabled
		goToGame();
		sendSocket({ action: 'startGame' });
	}
}

// Gets a boolean from the backend saying if we have enough people to start
function setGameReady(ready) {
	if(ready)
		$('#start-game').removeClass('disabled');
	else
		$('#start-game').addClass('disabled');
}