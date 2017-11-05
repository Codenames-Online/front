var me, socket;

$(document).ready(function() {
	setupSocket();
	$('.registration-page-cont .btn').click(goToRoster);
	$('.registration-page-cont input').enterPress(goToRoster);
	$('#switch-teams').click(switchRosterTeam);
	$('#start-game').click(goToGame);
});
