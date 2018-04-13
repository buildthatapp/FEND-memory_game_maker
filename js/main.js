/*Variables to keep track of:
	cards_flipped: the number of cards flipped over. Should only ever be 2 cards flipped at most.
	card_values: the integer value stored inside of an element. ie; the value of the card.
	card_elements: the ID's of the cards flipped over. used to addClass/removeClass upon match found or match failed
	correct: the number of card matches that are correct. upon matching all pairs, correct will be 8.
	incorrect: the number of incorrect matches the player has made.
	game_win_condition: when the number of correct answers reaches this number, the game is won
	max_face_up_cards: the maximum number of face up cards allowed while guessing a match
	wait_time: wait time for setTimeout functions. can be adjusted to make addClass and removeClass speed up or slow down
	cards[]: array of cards, 1 through 8, will get shuffed using Fischer - Yates algorithm, then inserted into DOM
	state_of_cards{}: dictionary to keep track of the state of each card. true is face up, false is face down. state changes
	based on user clicks and card comparisons
*/
let cards_flipped = 0
let card_values = [];
let card_elements = [];
let correct = 0;
let incorrect = 0;
let game_win_condition = 8;
let max_face_up_cards = 2;
let wait_time = 750;
let cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
let state_of_cards = {
	'card1' : false,
	'card2' : false,
	'card3' : false,
	'card4' : false,
	'card5' : false,
	'card6' : false,
	'card7' : false,
	'card8' : false,
	'card9' : false,
	'card10' : false,
	'card11' : false,
	'card12' : false,
	'card13' : false,
	'card14' : false,
	'card15' : false,
	'card16' : false
}
//card sort and insert into dom
$(document).ready(function() {
	console.log(cards);
	shuffle(cards);
	console.log(cards);
	var index = 0;
	while (index < cards.length) {
		$('#card' + (index + 1)).append('<p>' + cards[index] + '</p>');
		index += 1;
	}
	//restart game button
	//Begin click event handling for the card elements	
	$('#restart').click(function() {
		restart_game();
	})
	//Timer countup
	let minutesLabel = document.getElementById("minutes");
	let secondsLabel = document.getElementById("seconds");
	let totalSeconds = 0;
	setInterval(setTime, 1000);

	function setTime() {
		if (correct != game_win_condition) {
			++totalSeconds;
			secondsLabel.innerHTML = pad(totalSeconds % 60);
			minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
		}
	}

	function pad(val) {
		var valString = val + "";
		if (valString.length < 2) {
			return "0" + valString;
		} else {
			return valString;
		}
	}
	//Begin click event handling for the card elements	
	$('div').click(function() {
		//Does not pass when the user has flipped over 2 cards
		if ((cards_flipped < max_face_up_cards) & (state_of_cards[$(this).attr('id')] === false)) {
			$(this).addClass('revealCard');
			//storing the card's text and ID into arrays
			card_values.push($(this).html());
			card_elements.push($(this).attr('id'))
			state_of_cards[$(this).attr('id')] = true;
				++cards_flipped;
			if (cards_flipped === max_face_up_cards){
				//when the user has flipped over 2 cards, compare their values
				compare_cards();
			}
		}
	})
	//compares the value within two cards. accepts no params.
	function compare_cards() {
		//if the value stored within the two flipped cards is the same, then add a matchFound class to the card element
		$('#moves').text('Moves : ' + (correct + incorrect + 1));
		if (correct + 1 > incorrect) {
			$('#rating').html('&#x2606;&#x2606;&#x2606;');
		}
		if ((correct <= incorrect) & (correct + 3 <= incorrect)) {
			$('#rating').html('&#x2606;&#x2606;');
		}
		if ((correct + 7) <= incorrect) {
			$('#rating').html('&#x2606;');
		}
		if (card_values[0] === card_values[1]) {
			$('#' + card_elements[0]).addClass('matchFound');
			$('#' + card_elements[1]).addClass('matchFound');
			//wait a bit, then remove the matchFound class BUT leave the cards face up. clear arrays to allow player to flip over 2 more cards
			setTimeout(function() {
				$('#' + card_elements[0]).removeClass('matchFound');
				$('#' + card_elements[1]).removeClass('matchFound');
				clear_cards_flipped();
				empty_array(card_values);
				empty_array(card_elements);
				correct += 1;
				//if the user has correctly matched all pairs, then ask if they want to play again
				if (correct === game_win_condition) {
					if (confirm(
							'Congratulations! You have won. Would you like to play again?')) {
						alert('It took you ' + $('#minutes').text() + ' minutes : ' + $(
							'#seconds').text() + ' seconds to win!');
						alert('Your rating is :  ' + $('#rating').html());
						restart_game();
					} else {
						alert('Thanks for playing');
					}
				}
			}, wait_time);
		} else {
			$('#' + card_elements[0]).addClass('matchNotFound');
			$('#' + card_elements[1]).addClass('matchNotFound');
			setTimeout(function() {
				$('#' + card_elements[0]).removeClass('matchNotFound').removeClass(
					'revealCard');
				$('#' + card_elements[1]).removeClass('matchNotFound').removeClass(
					'revealCard');
				clear_cards_flipped();
				empty_array(card_values);
				state_of_cards[card_elements[0]] = false;
				state_of_cards[card_elements[1]] = false;
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
		cards_flipped = 0;
	}

	function restart_game() {
		location.reload(true)
	}
	/**
	 * Fischer - Yates shuffle algorithm
	 * Shuffles array in place.
	 * @param {Array} a items An array containing the items.
	 */
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
	}
});