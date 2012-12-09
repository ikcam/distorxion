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

  var AUDIO_FILE = 'http://distorxionradio.com:8000/;stream.mp3',
    waveform = $('#audio')[0],
    ctx = waveform.getContext('2d'),
    dancer, kick;

  /*
   * Dancer.js magic
   */
  Dancer.setOptions({
    flashSWF : 'lib/soundmanager2.swf',
    flashJS  : 'lib/soundmanager2.js'
  });

  dancer = new Dancer();
  kick = dancer.createKick({
    onKick: function () {
      ctx.strokeStyle = '#009874';
    },
    offKick: function () {
      ctx.strokeStyle = '#333';
    }
  }).on();

  dancer
    .load({ src: AUDIO_FILE, codecs: [ 'ogg', 'mp3' ]})
    .waveform( waveform, { strokeStyle: '#666', strokeWidth: 2 });

  Dancer.isSupported() || loaded();
  !dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded();

  /*
   * Loading
   */

  function loaded () {
    var supported = Dancer.isSupported(),
      p;

    if ( !supported ) {
      p = document.createElement('P');
      p.appendChild( document.createTextNode( 'Your browser does not currently support either Web Audio API or Audio Data API. The audio may play, but the visualizers will not move to the music; check out the latest Chrome or Firefox browsers!' ) );
      loading.appendChild( p );
    }

    dancer.play();
  }

  var vol_saved = 0.7;
  dancer.setVolume(vol_saved);

	$('#bt-play').click(function(){
		dancer.play();
	});

	$('#bt-pause').click(function(){
		dancer.pause();
	});

	$('#bt-voldown').click(function(){
    var volume = dancer.getVolume();
    volume = volume - 0.1;
    dancer.setVolume(volume);
	});

	$('#bt-volup').click(function(){
    var volume = dancer.getVolume();
    volume = volume + 0.1;
    dancer.setVolume(volume);
	});

	$('#bt-mute').click(function(){
    if( dancer.getVolume() === 0 ){
      dancer.setVolume(vol_saved);
      $(this).text('Mute');
    } else {
      vol_saved = dancer.getVolume();
      dancer.setVolume(0);
      $(this).text('Unmute');
    }
	});

  var data = {
    action: 'sandbox_streaming_song'
  };

  $.post('http://distorxionradio.com/response.php', data, function(response) {
    $('div.player > div.song').text(response);
  }); 

  setInterval(function(){
    var data = {
      action: 'sandbox_streaming_song'
    };

    $.post('http://distorxionradio.com/response.php', data, function(response) {
      $('div.player > div.song').text(response);
    });    
  },10000);
});

