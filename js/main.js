var cardsFlipped = 0
var card_values = [];
var card_elements = [];
var correct = 0;
var incorrect = 0;

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
	if (card_values[0] === card_values[1])  {
		$('#' + card_elements[0]).addClass('matchFound');
		$('#' + card_elements[1]).addClass('matchFound');
		setTimeout(
			function() {
				$('#' + card_elements[0]).removeClass('matchFound');
				$('#' + card_elements[1]).removeClass('matchFound');
				clear_cards_flipped();
				empty_array(card_values);
				empty_array(card_elements);
				correct += 1;
				if (correct === 8) {
					if (confirm('Congratulations! You have won. Would you like to play again?')) {
						restart_game();
					}
					else {
						alert('Thanks for playing');
					}
				}
			}, 750);

	}
	else {

		$('#' + card_elements[0]).addClass('matchNotFound');
		$('#' + card_elements[1]).addClass('matchNotFound');
		
		setTimeout(
			function() {
				$('#' + card_elements[0]).removeClass('matchNotFound').removeClass('revealCard');
				$('#' + card_elements[1]).removeClass('matchNotFound').removeClass('revealCard');
				clear_cards_flipped();
				empty_array(card_values);
				empty_array(card_elements);
				incorrect += 1;
			}, 750);
	}
}

function empty_array(my_array) {
	my_array.length = 0;
}

function clear_cards_flipped(cards) {
	cardsFlipped = 0;
}

function restart_game() {
	location.reload(true)
}

	
	

