/* Leads to unsafe infuse

var button = OO.ui.infuse( $( '#my-button' ) );

mw.loader.using( 'oojs-ui-core' ).done(
	function infuseAll() {

			// eslint-disable-next-line no-jquery/no-global-selector
			$( '*[data-ooui]' ).each( function () {
				OO.ui.infuse( this );
			} );

		}


);
*/
