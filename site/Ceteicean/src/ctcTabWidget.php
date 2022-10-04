<?php
use MediaWiki\MediaWikiServices;
use MediaWiki\Parser;

class ctcTabWidget {

  function run ( &$out, $outputContent, $docBtnStr, $docPageStr = '', $sourceCode, $hasTeiHeader ) {

    $ctcTabName1 = wfMessage( 'cetei-tabheader-1' )->parse(); //Text
    $ctcTabName2 = wfMessage( 'cetei-tabheader-2' )->parse(); //Doc
    $ctcTabName3 = wfMessage( 'cetei-tabheader-3' )->parse(); //Source
    $ctcTopRight = wfMessage( 'cetei-top-right-content' )->parse();

    /* Prepare toggle for TEI Header */
    if ( $hasTeiHeader === true ) {
      $ctcToggleShow = wfMessage( 'cetei-teiheader-toggle-show' )->parse();
      $ctcToggleBtn = Html::element( 'button', [
          'id' => 'toggle-tei-header',
          'class' => 'cetei-btn'
        ], $ctcToggleShow );
      $ctcBeforeHeader = '<div class="cetei-toggle-wrapper">' . $ctcToggleBtn . '</div>';
    } else {
      $ctcBeforeHeader = '<div class="cetei-header-not-available">' . wfMessage( 'cetei-header-not-available' )->parse() . '</div>';
    }

    if ( $docPageStr !== '' ) {
      $ctcDoc = '<div class="cetei-doc">' . $docPageStr . '</div>';
    } else {
      $ctcDoc = '<div class="cetei-no-documentation">' . wfMessage( 'cetei-no-documentation' )->parse() . '</div>';
    }

    $ctcTabHeaders = '<div class="cetei-nav-container"><div class="cetei-tab-wrapper"><div class="cetei-nav-tabs">';
    $ctcTabHeaders .= '<a class="nav-tab-item active" href="#nav-pane-1">' . $ctcTabName1 . '</a>';
    $ctcTabHeaders .= '<a class="nav-tab-item" href="#nav-pane-2">'. $ctcTabName2 .'</a>';
    $ctcTabHeaders .= '<a class="nav-tab-item" href="#nav-pane-3">' . $ctcTabName3 . '</a></div>' . $ctcTopRight . '</div>';

    $ctcTabContent1 = '<div class="cetei-tab-content">';
    $ctcTabContent1 .= '<div class="cetei-tab-pane active" id="nav-pane-1">';

    $ctcTabContent1 .= $ctcBeforeHeader;
//<button id="toggle-tei-header" class="btn btn-default">
    $ctcTabContent1 .= $outputContent . '</div>';
    $ctcTabContent1 .= '<div class="cetei-tab-pane" id="nav-pane-2">';
    $ctcTabContent1 .= '<div class="cetei-edit-doc">' . $docBtnStr . '</div>';

    $out->addHTML( $ctcTabHeaders . $ctcTabContent1 );

    $out->addWikiTextAsContent( $ctcDoc );

    $ctcTabContent2 = '</div>';
    $ctcTabContent2 .= '<div class="cetei-tab-pane" id="nav-pane-3">' . $sourceCode . '</div>';
    $ctcTabContent2 .= '</div>';

    $ctcTabContent2 .= '<hr/><div class="cetei-credits-bottom">' . wfMessage( 'cetei-credits-bottom' )->parse() . '</div></div>';

    $out->addHTML( $ctcTabContent2 );

  }

}
