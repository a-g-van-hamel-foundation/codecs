<?php

use MediaWiki\MediaWikiServices;
use MediaWiki\MainConfigNames;
use MediaWiki\StatusValue;
//use MediaWiki\Parser;
use MediaWiki\OutputPage as OutputPage;
//use MediaWiki\MagicWord;
//use WikibaseSolutions\MediaWikiTemplateParser\RecursiveParser;
//use RecursiveParser;
use OOUI\IndexLayout;
use OOUI\PanelLayout;
use OOUI\TabPanelLayout;
use OOUI\TabSelectWidget;
use OOUI\TabOptionWidget;
use ctcRender\buildPage;

class ctcContent extends \TextContent {

  /**
	 * @param string $text
	 * @param string $modelId
	 * @param bool $thorough
	 */
   public const MODEL = CONTENT_MODEL_XML;
   public function __construct( $text, $modelId = self::MODEL ) {
     parent::__construct( $text, $modelId );
   }

  /**
	 * Gets content to wiki's search index
	 * @todo: preserve attribute values
	 * @return string
	 */
   public function getTextForSearchIndex() {
		$value = strip_tags( $this->getText() );
    $value = html_entity_decode( $value, ENT_QUOTES | ENT_XML1, 'UTF-8' );
    return $value;
  }

  /**
	 * @return string
   * The content to include when it is transcluded by another wikitext page.
   * Return false if the content is not includable in a wikitext page.
   * Transclusion probably only makes sense if we want to reveal the unprocessed content in pre tags
   * @todo: make this work with both SyntaxHighlight and Highlight_Integratiion
	 */
  public function getWikitextForTransclusion() {
         $textObject = $this->convert( CONTENT_MODEL_TEXT );
         '@phan-var WikitextContent $wikitext';
         if ( $textObject ) {
           $text = $textObject->getText();
           $text = htmlentities( $text, ENT_QUOTES, 'UTF-8' );
           return $text;
         } else {
             return false;
         }
     }

  protected function fillParserOutput(
      Title $title, $revId,
  		ParserOptions $options, $generateHtml,
      ParserOutput &$output
  	) {

  	global $wgTextModelsToParse;
  	if ( in_array( $this->getModel(), $wgTextModelsToParse ) ) {
  			// Parse just to get links, etc., into database; HTML is replaced below.
        $textToParse = $this->updateCacheExpiry(0)->getText(); //invalidates cache
  			$output = MediaWikiServices::getInstance()->getParser()->parse( $textToParse, $title, $options, true, true, $revId );
  	}

    $context = new RequestContext();
    $out = \RequestContext::getMain()->getOutput();

    $retrievedText = $this->mText;

  	if ( $generateHtml ) {
      $html = ctcRender::buildPage( $out, $retrievedText );
  	} else {
  		$html = '';
  	}

  	$output->clearWrapperDivClass();
  	$output->setText( $html );
  }


}
