var me, socket;
function setMe(newMe) { me = newMe; }

$(document).ready(function() {
	setupSocket();
	$('.registration-page-cont .btn').click(goToRoster);
	$('#switch-teams').click(switchRosterTeam);
	$('#start-game').click(goToGame);
});