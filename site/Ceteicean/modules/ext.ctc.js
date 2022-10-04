"use strict";

/* Runs CETEICEAN  */
//var declareDocType = "<!DOCTYPE TEI SYSTEM './extensions/Ceteicean/modules/ext.char-entities.dtd'>";

if ( mw.config.exists( 'wgCeteiBehaviorsJsFile' ) == true ) {
	var customBehaviorsFile = mw.config.get( 'wgCeteiBehaviorsJsFile' );
} else {
  var customBehaviorsFile = '/extensions/Ceteicean/modules/ext.ctc.behaviors.js';
}

mw.loader.getScript( customBehaviorsFile ).then( function () {

//Renders the full document
function ceteiRenderDoc ( div, docURL ) {
  div.classList.add('cetei-rendering');
	var CETEIcean = new CETEI({
    ignoreFragmentId: true
    //, debug: true
  });
	CETEIcean.addBehaviors( configCustomBehaviors );
	CETEIcean.getHTML5(docURL, function(data) {
    div.innerHTML = "";
		div.appendChild(data);
    div.classList.remove('cetei-rendering');
    div.classList.add('cetei-rendered');
		//CETEIcean.addStyle(document, data);
	});
}

//CeTEIcean function for rendering the full document
function ceteiRenderDoc ( div, docURL ) {
  div.classList.add('cetei-rendering');
	var CETEIcean = new CETEI({
    ignoreFragmentId: true
    //, debug: true
  });
	CETEIcean.addBehaviors( configCustomBehaviors );
	CETEIcean.getHTML5(docURL, function(data) {
    div.innerHTML = "";
		div.appendChild(data);
    div.classList.remove('cetei-rendering');
    div.classList.add('cetei-rendered');
		//CETEIcean.addStyle(document, data);
	});
}

// Renders an excerpt
function ceteiRenderExcerpt ( div, docURL, docAttr, docAttrVal, docEl = '' ) {
	var CETEIcean = new CETEI({
    ignoreFragmentId: true
  });
  div.classList.add('cetei-rendering');
	CETEIcean.addBehaviors( configCustomBehaviors );
	CETEIcean.getHTML5(docURL, function(data) {
		/* Escape colon in attribute, e.g. xml:id, xml:lang, xml:space */
		if ( docAttr.includes(':') == true ) {
			//var selectorAttr = '*|id';
			//var selectorAttr = docAttr.replace('xml:', '*|' );
			var selectorAttr = docAttr.replace(':', '\\:' ); //e.g. for "xml:id"
		} else {
			var selectorAttr = docAttr;
		}
    var selectorEl = convertEltoCE( docEl );
		var selector = selectorEl + "[" + selectorAttr + "='" + docAttrVal + "']";
		//var selector = "[*|id='p2']";
			//var dataExcerpt = data.querySelector(selector);;
			//div.appendChild(dataExcerpt);
		/* more than one excerpt may match selection */
		var dataExcerpts = data.querySelectorAll( selector ); //returns nodeList
		div.innerHTML = ""; //empty

		for (var item of dataExcerpts) {
			var wrapper = document.createElement('div');
			wrapper.classList.add('cetei-instance-result');
			wrapper.appendChild(item);
			div.appendChild(wrapper);
		}
    div.classList.remove('cetei-rendering');
    div.classList.add('cetei-rendered');
		//CETEIcean.addStyle(document, data);

	});
}

function convertEltoCE( el ) {
  if ( el !== '' && el != '*' ) {
    if ( el.includes(":") == true ) {
      var elNew = 'tei-' + el.replace(/:/, "-").toLowerCase();
    } else {
      var elNew = 'tei-' + el.toLowerCase();
    }
  } else {
    var elNew = '*';
  }
  return elNew;
}

//CeTEIcean function for fetching the header
function ceteiRenderHeader ( div, docURL ) {
  div.classList.add('cetei-rendering');
	var CETEIcean = new CETEI({
    ignoreFragmentId: true
  });
	CETEIcean.getHTML5(docURL, function(data) {
		//var dataHeader = data.getElementsByTagName('teiHeader');
		var selector = 'tei-teiheader';
		var dataHeader = data.querySelector(selector);
		if ( typeof dataHeader != 'undefined' && dataHeader != null ) {
			div.innerHTML = "";
			div.appendChild(dataHeader);
			dataHeader.firstChild.hidden = false;
      div.classList.remove('cetei-rendering');
      div.classList.add('cetei-rendered');
		} else {
			var msg = document.createElement("div");
			msg.textContent += mw.message('cetei-header-not-available');
			msg.classList.add('alert', 'cetei-alert');
			div.appendChild(msg);
      div.classList.remove('cetei-rendering');
      div.classList.add('cetei-no-tei-header');
		}
		// div.appendChild(msg);
	});
}

function convertCeteiInstances( divEl ) {
	/* Get each instance first and retrieve the necessary variables */
	var targetEl = document.querySelectorAll(divEl);
	targetEl.forEach(div => {
		if ( typeof div != 'undefined' && div != null ) {
			var docURL =  div.getAttribute('data-doc');
			var docAttr = div.getAttribute('data-attr'); // attribute if present
			var docAttrVal = div.getAttribute('data-attr-val'); // attribute value
      var docEl = div.getAttribute('data-el'); //element
        //console.log( 'current value of docEl is ' + docEl);
			var docHeader = div.getAttribute('data-header');
      if ( typeof docAttr != 'undefined' && docAttr != null ) {
				ceteiRenderExcerpt ( div, docURL, docAttr, docAttrVal, docEl );
      } else if ( typeof docEl != 'undefined' && docEl != null  ) {
        ceteiRenderExcerpt ( div, docURL, docAttr, docAttrVal, docEl );
			} else if ( docHeader == '1' ) {
				ceteiRenderHeader ( div, docURL );
			} else {
				ceteiRenderDoc ( div, docURL );
			}

			/* reset values */
      var docEl = '';
			var docAttr = '';
			var docAttrVal = '';
		}
	});
}

var ceteiTriggerSel = '.cetei-instance[data-doc]';
//convertCeteiInstances( ceteiTriggerSel );
document.addEventListener('DOMContentLoaded', convertCeteiInstances( ceteiTriggerSel ) );

// The enclosed code runs only after the page has been loaded and parsed.

} ); //mw.loader.using
