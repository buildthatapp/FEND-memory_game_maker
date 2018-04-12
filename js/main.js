/*Variables to keep track of:
	cardsFlipped: the number of cards flipped over. Should only ever be 2 cards flipped at most.
	card_values: the integer value stored inside of an element. ie; the value of the card.
	card_elements: the ID's of the cards flipped over. used to addClass/removeClass upon match found or match failed
	correct: the number of card matches that are correct. upon matching all pairs, correct will be 8.
	incorrect: the number of incorrect matches the player has made.
	game_win_condition: when the number of correct answers reaches this number, the game is won
	max_face_up_cards: the maximum number of face up cards allowed while guessing a match
	wait_time: wait time for setTimeout functions. can be adjusted to make addClass and removeClass speed up or slow down
*/
var cardsFlipped = 0
var card_values = [];
var card_elements = [];
var correct = 0;
var incorrect = 0;
var game_win_condition = 8;
var max_face_up_cards = 2;
var wait_time = 750;

$( document ).ready(function() {
	//Begin click event handling for the card elements	
	$('card').click(function() {
		//Does not pass when the user has flipped over 2 cards
		if (cardsFlipped < max_face_up_cards) {
			$(this).addClass('revealCard');
			//storing the card's text and ID into arrays
			card_values.push($(this).text());
			card_elements.push($(this).attr('id'))
			cardsFlipped = cardsFlipped + 1;
			if (cardsFlipped === max_face_up_cards) {
				//when the user has flipped over 2 cards, compare their values
				compare_cards();
		}}})});
//compares the value within two cards. accepts no params.
function compare_cards() {
	//if the value stored within the two flipped cards is the same, then add a matchFound class to the card element
	if (card_values[0] === card_values[1])  {
		$('#' + card_elements[0]).addClass('matchFound');
		$('#' + card_elements[1]).addClass('matchFound');
		//wait a bit, then remove the matchFound class BUT leave the cards face up. clear arrays to allow player to flip over 2 more cards
		setTimeout(
			function() {
				$('#' + card_elements[0]).removeClass('matchFound');
				$('#' + card_elements[1]).removeClass('matchFound');
				clear_cards_flipped();
				empty_array(card_values);
				empty_array(card_elements);
				correct += 1;
				//if the user has correctly matched all pairs, then ask if they want to play again
				if (correct === game_win_condition) {
					if (confirm('Congratulations! You have won. Would you like to play again?')) {
						restart_game();
					}
					else {
						alert('Thanks for playing');
					}
				}
			}, wait_time);

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
			}, wait_time);
	}
}

function empty_array(my_array) {
	//empty array
	my_array.length = 0;
}

function clear_cards_flipped(cards) {
	cardsFlipped = 0;
}

function restart_game() {
	location.reload(true)
}

	
	

