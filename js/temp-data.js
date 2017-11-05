/**
 * This file stores placeholder data for testing
 */

var sampleTeams = {
	blue: ['John', 'Jane', 'Adam', 'Tom'],
	red: ['Catniss', 'Spock', 'Arthur', 'Karl']
};

var sampleMe = {
	name: "John",
	team: 0 // blue
}

var sampleBoard = {
	cards: [{
			word: "Banana",
			votes: ["John", "Jane", "Thomas"]
		},
		{word: "Mercury", votes: [], revealed: true},
		{
			word: "Apple",
			votes: ["Adam"]
		}
	],
	colors: [0,1,4,3,0,0,1,4,1,2,0,1,4,1,2,0,1,4,4,0,0,1,4,2,0]
}

var initialCardLength = sampleBoard.cards.length 
var cardsToAdd = 25 - initialCardLength;
var revealed = false;

for(var i = 0; i < cardsToAdd; i++) {
	revealed = false;

	if(sampleBoard.colors[i + initialCardLength] == 2)
		revealed = true;

	sampleBoard.cards.push({word: "Codeword", votes: [], revealed: revealed});
}