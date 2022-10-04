<?php

use MediaWiki\Content\Content;
use MediaWiki\Content\Html;
use MediaWiki\Content\Renderer\ContentParseParams;
use MediaWiki\Content\Transform\PreSaveTransformParams;
use MediaWiki\Content\ValidationParams;
//use MWException;
//use ParserOutput;
//use Status;
//use StatusValue;
//use MediaWiki\Content\CodeContentHandler;
//use TextContentHandler;
//use Title;

class ctcContentHandler extends CodeContentHandler {

	/**
	 * @param string $modelId
	*/
	public function __construct(
		$modelId = CONTENT_MODEL_XML,
		$formats = [ CONTENT_FORMAT_TEXT ]
	) {
		parent::__construct( $modelId, $formats );
	}

	/**
	 * @see TextContentHandler::getContentClass
	 * @return string
	 */
	protected function getContentClass() {
		return ctcContent::class;
	}

	/**
	 * Create empty cottent object and set default text for starting a new page
	 * @see ContentHandler::makeEmptyContent
	 * @return ctcContent
	 */
	public function makeEmptyContent() {
		return new ctcContent(
			wfMessage( 'cetei-default-content' )->plain()
		);
	}

	/** Returns false if namespace is not NS_CETEI
		* @return bool
		*/
	public function canBeUsedOn( Title $title ) {
	  //Only in NS_CETEI
	  if ( $title->getNamespace() !== NS_CETEI ) {
	    return false;
	  }
	  // make an exception for doc pages?
	  return parent::canBeUsedOn( $title );
	}

}
