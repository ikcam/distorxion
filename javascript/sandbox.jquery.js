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
		$('#audio')[0].pause();
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

(function () {

  var
    AUDIO_FILE = 'http://distorxionradio.com:8000/;stream.mp3',
    waveform = document.getElementById( 'waveform' ),
    ctx = waveform.getContext( '2d' ),
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
    var
      loading = document.getElementById( 'loading' ),
      anchor  = document.createElement('A'),
      supported = Dancer.isSupported(),
      p;

    anchor.appendChild( document.createTextNode( supported ? 'Play!' : 'Close' ) );
    anchor.setAttribute( 'href', '#' );
    loading.innerHTML = '';
    loading.appendChild( anchor );

    if ( !supported ) {
      p = document.createElement('P');
      p.appendChild( document.createTextNode( 'Your browser does not currently support either Web Audio API or Audio Data API. The audio may play, but the visualizers will not move to the music; check out the latest Chrome or Firefox browsers!' ) );
      loading.appendChild( p );
    }

    anchor.addEventListener( 'click', function () {
      dancer.play();
      document.getElementById('loading').style.display = 'none';
    });
  }

  // For debugging
  window.dancer = dancer;

})();

