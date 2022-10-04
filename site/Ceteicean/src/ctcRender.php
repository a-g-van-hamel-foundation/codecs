<?php
use MediaWiki\MediaWikiServices;
use MediaWiki\MainConfigNames;
use MediaWiki\OutputPage;
use MediaWiki\ParserOutput;
use MediaWiki\PPFrame;
//use MediaWiki\PPNode;

class ctcRender {

  /* Run #cetei parser function */
  public static function runCeteiPF( $parser, $frame, $args ) {
  		$str = self::createCeteiPF( $parser, $frame, $args );
      return [
        $str,
        'noparse' => true,
        'isHTML' => false
      ];
  }

  /* Create #cetei parser function */
  protected static function createCeteiPF( $parser, $frame, $params ) {
      $paramDoc = ''; //default
      $paramCss = ''; //default
      $outputDefault = '<div class="cetei-no-document-found"><i>' . wfMessage( 'cetei-no-document-found' )->parse() . '</i></div>';

      if ( $params == null || $params == 'undefined' ) {
        return $outputDefault;
      }

  		foreach ( $params as $i => $param ) {
        $paramExpanded = $frame->expand($param);
  			$keyValPair = explode( '=', $paramExpanded, 2 );

  			// set paramName and value
  			if ( count( $keyValPair ) > 1 ) {
  				$paramName = trim( $keyValPair[0] );
  				$value = trim( $keyValPair[1] );
  			} elseif ( $i == 1
            && count( $keyValPair ) == 1
            && trim($keyValPair[0]) !== 'doc' ) {
          $paramName = 'doc'; // for shorthand {{#cetei:url}}
          $value = trim( $keyValPair[0] );
        } else {
          $paramName = null;
          $value = trim( $paramExpanded );
  			}

  			if ( $paramName == 'doc' ) {
          if ( $value == null || $value == 'undefined' ) {
            return $outputDefault;
          } else {
            $paramDoc = $value;
          }
  			} elseif ( $paramName == 'attrval' ) {
          $paramAttrVal = $value;
        } elseif ( $paramName == 'attr' ) {
        	$paramAttr = $value;
        } elseif ( $paramName == 'el' ) {
  				$paramEl = $value;
        } elseif ( $paramName == 'css' ) {
  				$paramCss = $value;
  			} else {
          return $outputDefault;
        }

  		} //end of foreach

      $randomNo1 = rand(1000, 9999);
      $randomNo2 = rand(1000, 9999);
      $tempSpinner = Html::element( 'span', [
        'class' => 'spinner-dual-ring'
      ], '' );
      /* ... */
      if (isset ( $paramAttr ) || isset ( $paramEl ) ) {
        $output = Html::rawElement( 'div', [
            'id' => 'cetei-' . $randomNo1 . '-' . $randomNo2,
            'class' => 'cetei-instance',
            'data-doc' => $paramDoc,
            'data-el' => isset( $paramEl ) ? $paramEl : '',
            'data-attr' => isset( $paramAttr ) ? $paramAttr : '',
            'data-attr-val' => isset( $paramAttrVal ) ? $paramAttrVal : ''
        ], '' );
      } else {
        $output = Html::rawElement( 'div', [
            'id' => 'cetei-' . $randomNo1 . '-' . $randomNo2,
            'class' => 'cetei-instance',
            'data-doc' => $paramDoc
        ], $tempSpinner );
      }

      if ( $paramDoc !== null and  $paramDoc !== 'undefined'  ) {
        return $output;
      } else {
        return $outputDefault;
      }

  } //end of function

  /* Build page in Cetei: namespace */
  public static function buildPage( $out, $retrievedText ) {

    $parser = MediaWikiServices::getInstance()->getParserFactory()->create();
    $pageTitle = $out->getTitle();
    $pageName = $out->getTitle()->getText();
    $pageUrlRaw = $out->getTitle()->getFullURL( 'action=raw' );
    $tempSpinner = Html::element( 'span', [
      'class' => 'spinner-dual-ring'
    ], '' );
    $ceteiInstanceDiv = Html::element( 'div', [
      'id' => 'cetei',
      'class' => 'cetei-instance',
      'data-doc' => $pageUrlRaw
    ], '' );
    $preSourceContent = Html::element( 'pre',
      ['lang'=>'xml',
       'class'=>'cetei-source-xml
      '], $retrievedText ); //Source code to be shown in pre tags
    /* Because hidden comments could potentially be an issue to xml parse: */
    $sourceContent = preg_replace( '/<!--.*?-->/s', '', $retrievedText );

    /* /doc subpage: */
    $docPageTitle = $pageTitle . '/doc';
    if ( self::hasDocPage( $pageTitle ) == true ) {
      $docAddMsg = wfMessage( 'cetei-edit-documentation' )->parse();
      //$linkDocUrl = Title::newFromText( $docPageTitle )->getFullURL( 'action=edit' );
      $linkDocUrl = wfMessage( 'cetei-edit-documentation-url' )->params( $docPageTitle )->text();
      if ( self::isUser() == true ) {
        $docBtnStr = self::createButtonWidget( $out, $docAddMsg, $linkDocUrl, 'edit', null );
      } else {
        $docBtnStr = ''; //default
      }
      $docPageStr = self::showDocPage( $out, $pageTitle );
    } else {
      $docBtnStr = ''; //default
      $docPageStr = ''; //default
      if ( self::isUser() == true ) {
        //$linkDocUrl = Title::newFromText( $docPageTitle )->getFullURL( 'action=edit' );
        $linkDocUrl = wfMessage( 'cetei-edit-documentation-url' )->params( $docPageTitle )->text();
        $docAddMsg = wfMessage( 'cetei-add-documentation' )->parse();
        $docBtnStr = self::createButtonWidget( $out, $docAddMsg, $linkDocUrl, 'edit', null );
      } else {
        $docPageStr = '';
      }
    }

    /* Retrieve basic data from document through ctcXPath class  */
    $ctcXPath = new ctcXPath();
    $ctcHeaderTitle = $ctcXPath->getHeaderTitle( $sourceContent );
    if ( $ctcHeaderTitle != null ) {
      $out->setPageTitle( strip_tags($ctcHeaderTitle) );
    } else {
      $out->setPageTitle( $pageName );
    }
    $hasTeiHeader = $ctcXPath->hasTEIHeader( $sourceContent );

    /* Build tab widget and assign content
    * $ceteiInstanceDiv = html for CETEIcean;
    * $docBtnStr = button for doc subpage;
    * $docPageStr = wikitext from doc subpage;
    * $preSourceContent = source code to be rendered with pre tags;
    */
    $tabWidget = new ctcTabWidget();
    $output = $tabWidget->run(
      $out,
      $pageTitle,
      $ceteiInstanceDiv,
      $docBtnStr,
      $docPageStr,
      $preSourceContent,
      $hasTeiHeader
    );

    return $output;
  }

  /* Check whether or not current page is an associated /doc subpage */
  public static function isDocPage( $title ) {
    if (preg_match("/\/doc/i", $title )) {
      return true;
    } else {
      return false;
    }
  }

  /* Check whether TEI page ($title) has an associated /doc subpage */
  public static function hasDocPage( $title ) {

    if ( $title ) {
      $docPageStr = $title . '/doc';
    } else {
      $out = \RequestContext::getMain()->getOutput();
      $docPageStr = $out->getTitle() . '/doc';
    }
    $docPageObj = Title::newFromText( $docPageStr );
    $docPageID = $docPageObj->getArticleID() ;
    // if Page ID equals 0, page does not exist
    if ( $docPageID !== 0 ) {
      return true;
      } else {
      return false;
    }

  }

  /* Transclude /doc subpage */
  private static function showDocPage( $out, $forPageTitle ) {

    $docPageTitle = $forPageTitle . '/doc';
    $docPageObj = Title::newFromText( $docPageTitle );
    $docPageID = $docPageObj->getText();
    $docPageStr = '{{' . $docPageTitle . '}}<hr />';
    $docWikitext = Html::rawElement( 'div', [
      'class' => 'cetei-doc-page' ],
  			// Line breaks are needed so that wikitext would be
        // appropriately isolated for correct parsing. See Bug 60664.
  		"\n" . $docPageStr . "\n"
  		);
    return $docWikitext;

	}

  /* create OOUI-styled button link */
  public static function createButtonWidget( $out, $text, $linkUrl = null, $icon = null, $id = null ) {

    $out->enableOOUI();
    $out->setupOOUI('default','ltr');
    $out->addModules( 'ext.oojs.assets' );
    $out->addModuleStyles( [ 'oojs-ui.styles.icons-content', 'oojs-ui.styles.icons-editing-core' ] );

    $btn = new OOUI\ButtonWidget( [
      'label' => $text,
      'title' => $text,
      'href' => $linkUrl,
      'icon' => $icon,
      'id' => $id
    ] );

    return $btn;

  }

  /*
  * Check if present user is in the 'user' group
  * @todo: change hardcoded 'user' to language-independent value?
  * @todo: check whether user has editing rights = preferred action
  */
  private static function isUser() {
    $presentUser = \RequestContext::getMain()->getUser();
    $presentUserGroups = [];
    $presentUserGroups = MediaWikiServices::getInstance()->getUserGroupManager()->getUserEffectiveGroups( $presentUser );
    if ( in_array( 'user', $presentUserGroups ) ) {
			return true;
		} else {
      return false;
    }
  }


}
