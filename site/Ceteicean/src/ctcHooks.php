<?php

use MediaWiki\MediaWikiServices;
//use MediaWiki\ExtensionRegistry;
use MediaWiki\OutputPage;
//use MediaWiki\Parser;
use MediaWiki\ParserOutput;
use MediaWiki\PPFrame;

class ctcHooks {

  public static function onBeforePageDisplay( $out, $skin ): void {

    $namespaceConstant = $out->getTitle()->getNamespace();
    $action = $out->getRequest()->getVal( 'action' );

    $out->addModules( 'ext.ctc' );

    if ( $namespaceConstant === NS_CETEI ) {
      $out->addModuleStyles( 'ext.tabs.styles' ); // prevent FOUC
      $out->addModules( [ 'ext.tabs.assets' ] );
      if ( $action == 'edit' || $action == 'submit' ) {
          $out->addModuleStyles( 'ext.ctc.editor.styles' );
          $out->addModules( 'ext.ctc.wikieditor' );
      }
    }

  }

  /*
  ** Content handler for namespace through callback
  ** extension.json has "callback": "ctcHooks::onRegister"
  */
  public static function onRegister() {

    define( 'CONTENT_MODEL_XML', 'cetei' );

  }

  /* Content model XML default in NS_CETEI NS, except for /doc pages */
  public static function contentHandlerDefaultModelFor( Title $title, &$model ) {

    $isDoc = ctcRender::isDocPage( $title );
		if ( $title->getNamespace() === NS_CETEI && $isDoc !== true ) {
			$model = CONTENT_MODEL_XML;
			return true;
		} else {
		  return true;
    }

	}

  /* Enable CodeEditor through a hook */
  public static function onCodeEditorGetPageLanguage( Title $title, &$lang ) {
    $isDoc = ctcRender::isDocPage( $title );
		if ( $title->getNamespace() === NS_CETEI && $isDoc !== true ) {
      $lang = 'xml';
		  return true;
    } else {
		  return false;
    }
  }

  /* Register hook for #cetei parser function */
  public static function onParserFirstCallInit( Parser $parser ) {

    // Parser function #cetei: - Register any render callbacks with the parser
    $name = 'cetei';
    $functionCallback = [ 'ctcRender', 'runCeteiPF' ];
    $flags = Parser::SFH_OBJECT_ARGS;
    $parser->setFunctionHook( $name, $functionCallback, $flags );
    return true;

  }

  /**
   * ResourceLoaderGetConfigVars hook handler for setting a config variable
   * @see https://www.mediawiki.org/wiki/Manual:Hooks/ResourceLoaderGetConfigVars
   */
  public static function onResourceLoaderGetConfigVars( array &$vars, string $skin, Config $config ) {
    global $wgCeteiBehaviorsJsFile;
		$vars['wgCeteiBehaviorsJsFile'] = $wgCeteiBehaviorsJsFile;
		return true;
	}

}
