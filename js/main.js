var admin = false;

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