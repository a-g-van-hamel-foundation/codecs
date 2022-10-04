<?php
/**
 * Documentation: lists pages in the NS_CETEI namespace.
 *
 * @author
 * @file
 * @ingroup
 */

class ctcSpecialPage extends \QueryPage {

	public function __construct( $name = 'CETEIcean' ) {
		parent::__construct( $name );
	}

	function isExpensive() {
		return false;
	}

	function isSyndicated() {
		return false;
	}

	function getPageHeader( ) {
		$out = \RequestContext::getMain()->getOutput();
		$queryHeader = Html::element( 'p', null, $this->msg( 'cetei-specialpage-queryheader' )->text() );
		$jsonStr = self::fetchExtensionJson();
		$headerOutput = '';
		if ( $jsonStr !== false ) {
			$extCurrentVersion = $jsonStr['version'];
			$extAuthors = $jsonStr['author']; //array
			$extAuthorInfo = '';
			foreach ( $extAuthors as $i => $author ) {
				$extAuthorInfo .= '<div>' . $author . '</div>';
			}
			$extDescription = $jsonStr['description'];
			$headerOutput .= '<div class="cetei-specialpage-header">';
			$headerOutput .= '<div class="cetei-item"><strong>Description</strong><br>' . $extDescription . '</div>';
			$headerOutput .= '<div class="cetei-item"><strong>Version</strong><br>' . $extCurrentVersion . '</div>';
			$headerOutput .= '<div class="cetei-item"><strong>Authors</strong><br>' . $extAuthorInfo . '</div>';
			$headerOutput .= '</div>';
		}
		$headerOutput .= '<h2>Documents</h2><div class="cetei-specialpage-queryheader">' . $queryHeader . '</div>';

		$out->addWikiTextAsContent( $headerOutput );
	}

	function getPageFooter() {
	}

	function getQueryInfo() {
		if ( NS_CETEI !== 'undefined' ) {
			return [
				'tables' => [ 'page' ],
				'fields' => [ 'page_title AS title', 'page_title AS value' ],
				'conds' => [ 'page_namespace' => NS_CETEI, 'page_is_redirect' => 0 ]
			];
		}
	}

	function sortDescending() {
		return false;
	}

	function formatResult( $skin, $result ) {
		$pageName = $result->value;

		$title = Title::makeTitle( NS_CETEI, $pageName );
		return $this->getLinkRenderer()->makeKnownLink( $title, htmlspecialchars( $title->getText() ) );
	}

	protected function getGroupName() {
		return 'cetei_group';
	}

	public static function fetchExtensionJson() {
		global $IP;
		$jsonSource = "$IP/extensions/Ceteicean/extension.json";
		if ( file_exists( $jsonSource ) ) {
			$jsonContents = file_get_contents( $jsonSource );
			$jsonStr = json_decode( $jsonContents, true );
			if ( $jsonStr !== false ) {
				return $jsonStr;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}


}
