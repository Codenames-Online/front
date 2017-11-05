var admin = false;
var myTeam = "blue";

$(document).ready(function() {
	$('.card').click(selectCard);
	$('.card').contextmenu(selectCardTeam);
	$('.registration-page-cont .btn').click(goToRoster);
	$('#switch-teams').click(switchRosterTeam);
});

function goToRoster() {
	$('.registration-page-cont').fadeOut(function() {
		$('.roster-page-cont').fadeIn();
	});

	var name = $('.registration-page-cont input').val();
	$('.blue.roster .players').prepend('<div class="player self">' + name + '</div>');
}

function switchRosterTeam() {
	var player = $('.roster-page-cont .player.self').clone();

	if($('.roster-page-cont .roster.blue .player.self').length > 0) { // if on blue team
		$('.roster-page-cont .player.self').remove();
		$('.roster-page-cont .roster.red .players').prepend(player);
	}
	else {
		$('.roster-page-cont .player.self').remove();
		$('.roster-page-cont .roster.blue .players').prepend(player);
	}
}

function selectCard() {
	$('.card.selected.self .self-select').remove(); // delete self select icon
	$('.card.selected.self').removeClass('selected self'); //de self select
	$(this).addClass('selected self');

	// append self icon to make it last
	if(myTeam == "blue")
		$(this).find('.icon-cont').append('<div class="self-select blue"></div>');
	else
		$(this).find('.icon-cont').append('<div class="self-select red"></div>');
}

function switchTeams() {
	if($('body').attr('user-team') == "blue")
		$('body').attr('user-team', 'red');
	else
		$('body').attr('user-team', 'blue');
}

function selectCardTeam(event) {
	$(this).addClass('selected team');

	// prepend team icons to make them first
	if(myTeam == "blue")
		$(this).find('.icon-cont').prepend('<div class="team-select blue"></div>');
	else
		$(this).find('.icon-cont').prepend('<div class="team-select red"></div>');
}


function toggleAdmin() {
	if(admin) // remove admin by clearing agent values
		$('.card').removeAttr("data-agent");
	else {
		$('.card').each(function() {
			let rand = Math.random() * 50;

			if(rand < 1) // asssasin
				$(this).attr("data-agent", "black");
			else if(rand < 10)
				$(this).attr("data-agent", "red");
			else if(rand < 20)
				$(this).attr("data-agent", "blue");
		});
	}

	admin = !admin;
}

function notInDict() {
	showOverlay('not-in-dict');
}

function verifyClue() {
	showOverlay('verify-clue')
}

function showOverlay(id) {
  var innerText = "";
  if(id === "not-in-dict") {
    innerText = "That word isn’t in our dictionary. Please try again!"
  }
  else {
    innerText = "That is not a valid guess input. Please try again!"
  }

	$(".window-overlay, #" + id).text(innerText);
	$(".window-overlay, #" + id).fadeIn();
}

function closeOverlay() {
	$(".window-overlay, .overlay-msg").fadeOut();
}
