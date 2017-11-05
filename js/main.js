var me, socket;

$(document).ready(function() {
	setupSocket();
	$('.registration-page-cont .btn').click(goToRoster);
	$('.registration-page-cont input[type="text"]').enterPress(goToRoster);
	$('.registration-page-cont input[type="text"]').keyup(checkEnteredName);
	$('#switch-teams').click(switchRosterTeam);
	$('#start-game').click(startGameClick);
	$('.send-msg input[type="submit"]').click(sendMessage);
	$('.game-page-cont input[type="text"]').enterPress(sendMessage);
	$('.close-overlay').click(closeOverlay);
});
