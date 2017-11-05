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
		{word: "Mercury", revealed: true},
		{
			word: "Apple",
			votes: "Adam"
		}
	],
	colors: [0,1,2,3,0,0,1,2,1,0,0,1,2,1,0,0,1,2,2,0,0,1,2,2,0]
}

var cardsToAdd = 25 - sampleBoard.cards.length;

for(var i = 0; i < cardsToAdd; i++) {
	sampleBoard.cards.push({word: "Codeword"});
}