"use strict";
/* Interface on pages of the Cetei namespace */

function ctcNavTabs() {
	var tabElArray = document.querySelectorAll(".cetei-nav-tabs > .nav-tab-item");
  function myTabClicks(tabClickEvent) {
		for (var i = 0; i < tabElArray.length; i++) {
			tabElArray[i].classList.remove("active");
		}
		var clickedTab = tabClickEvent.currentTarget;
		clickedTab.classList.add("active");
		tabClickEvent.preventDefault();
		var contentPaneArray = document.querySelectorAll(".cetei-tab-pane");
		for (var i = 0; i < contentPaneArray.length; i++) {
			contentPaneArray[i].classList.remove("active");
		}
		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);
		activePane.classList.add("active");
	}
	for (var i = 0; i < tabElArray.length; i++) {
		tabElArray[i].addEventListener("click", myTabClicks)
	}
};

/* toggle appearance of the TEI Header */
function teiHeaderToggleClick( id ) {
  var btn = document.getElementById( id );
	if ( btn !== null ) {
		btn.addEventListener('click', (ev) => {
		    teiHeaderToggleAction( btn );
		  });
	} else {
		//do nothing
	}
}
function teiHeaderToggleAction( btn ) {
		var teiHeader = document.querySelectorAll( 'tei-teiheader > span' )[0];
		var match = teiHeader.getAttribute('hidden');
	  if ( match === '' ) {
	    teiHeader.removeAttribute('hidden');
			btn.classList.add('state-expanded');
			btn.textContent = mw.message('cetei-teiheader-toggle-hide');
	  } else {
	    teiHeader.setAttribute('hidden', '');
			btn.classList.remove('state-expanded');
			btn.textContent = mw.message('cetei-teiheader-toggle-show');
	  }
}

jQuery(document).ready(function($) {
	ctcNavTabs();
	teiHeaderToggleClick( 'toggle-tei-header' );
});
