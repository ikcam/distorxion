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
    flashSWF : '../../lib/soundmanager2.swf',
    flashJS  : '../../lib/soundmanager2.js'
  });

  dancer = new Dancer();
  kick = dancer.createKick({
    onKick: function () {
      ctx.strokeStyle = '#ff0077';
    },
    offKick: function () {
      ctx.strokeStyle = '#666';
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

	$('#bt-play').click(function(){
		dancer.play();
	});

	$('#bt-pause').click(function(){
		dancer.pause();
	});

	$('#bt-voldown').click(function(){
	});

	$('#bt-volup').click(function(){
	});

	$('#bt-mute').click(function(){
	})
});

