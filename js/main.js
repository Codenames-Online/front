var me, gid, socket;

$(document).ready(function() {
	setupSocket();
	
	$('.registration-page-cont .btn').click(registerName);
	$('.registration-page-cont input[type="text"]').enterPress(registerName);
	$('.registration-page-cont input[type="text"]').keyup(checkEnteredName);

	$('.lobby-registration-page-cont #createLobby').click(createLobby);
	$('.lobby-registration-page-cont #joinLobby').click(joinLobby);
	$('.lobby-registration-page-cont input[type="text"]').enterPress(joinLobby);
	$('.lobby-registration-page-cont input[type="text"]').keyup(checkEnteredLobby);

	$('#switch-teams').click(switchRosterTeam);
	$('#start-game').click(startGameClick);

	$('.send-msg input[type="submit"]').click(sendMessage);
	$('.game-page-cont input[type="text"]').enterPress(sendMessage);
	
	$('.guess-panel #submit-guess').click(submitGuess);
	$('.guess-panel #end-turn').click(endTurn);

	$('.close-overlay').click(closeOverlay);
});
