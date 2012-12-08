/*!
 * Sandbox.jquery.js v0.2
 * http://github.com/ikcam/Sandbox-HTML5
 *
 * Copyright 2012, Irving Kcam
 * Released under a GPL2 License.
 */

jQuery(document).ready(function($){
	$('#tabs').each(function(){
		$(this).tabs();
	});

	$('#accordion').each(function(){
		$(this).accordion({
			collapsible: true
		});
	});

	var volume = 0.7;
	
	$('#audio')[0].volume=volume;

	$('#bt-play').click(function(){
		$('#audio')[0].play();
	});

	$('#bt-pause').click(function(){
		$('#audio')[0].stop();
	});

	$('#bt-voldown').click(function(){
		$('#audio')[0].volume-=0.1;
	});

	$('#bt-volup').click(function(){
		$('#audio')[0].volume+=0.1;
	});

	$('#bt-mute').click(function(){
		if( $('#audio')[0].volume === 0 ){
			$('#audio')[0].volume = volume;
			$(this).text('Mute');
		} else {
			volume = $('#audio')[0].volume;
			$('#audio')[0].volume=0;
			$(this).text('Unmute');
		}
	})

});