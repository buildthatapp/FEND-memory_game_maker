var cardsFlipped = 0
var card_values = [];
var card_elements = [];

$( document ).ready(function() {	
	$('card').click(function() {
		if (cardsFlipped < 2) {
			$(this).addClass('revealCard');
			card_values.push($(this ).text());
			card_elements.push($(this).attr('id'))
			cardsFlipped = cardsFlipped + 1;
			//printing values to check if array is storing values correctly
			console.log(cardsFlipped);
			console.log(card_values);
			console.log(card_elements);
			if (cardsFlipped === 2) {
			compare_cards();
		}}})});

function compare_cards() {
	if (card_values[0] === card_values[1]) {
		$('#' + card_elements[0]).addClass('matchFound');
		$('#' + card_elements[1]).addClass('matchFound');
		
	}
};


	
	

