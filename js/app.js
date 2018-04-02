$(document).ready(function(){
	$('.col-md-3').mouseover(function() {
		$(this).css('background-color','blue');
	});
	$('.col-md-3').mouseout(function() {
		$(this).css('background-color','gray');
	});

	$('.col-md-3').click(function() {
		$(this).addClass('clicked');
	});
});
