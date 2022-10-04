var configCustomBehaviors = {
 "tei": {
		/* Smallest level behaviours first */
		//"l[n]": ["<span class=\"tei-number line-number\">[l. $@n]</span>"],
		"l": [
			["tei-l[n]", function(elt) {
				var numberValue = elt.getAttribute("n");
				var p = document.createElement("template");
				var numberSpan = document.createElement("span");
				numberSpan.setAttribute("class", "tei-number line-number");
				numberSpan.innerHTML = numberValue;
				//elt.insertAdjacentHTML("afterbegin", numberSpan.charAt(0) );
				p.innerHTML = numberSpan.outerHTML + elt.innerHTML;
				return p.content;
			}]
	 ],
	 "lb": ["<span class=\"tei-number line-break-number\">$@n</span>"],
	 "lg": ["<span class=\"tei-number line-group-number\">[$@n]</span>"],
	 "said": ["<span class='cetei-said'>“</span>", "<span class='cetei-said'>”</span>"],
   "add": ["<span class='cetei-add'>(", ")</span>"],
   //"note": ["<span class='mw-tippy-link'>[note]<span class='mw-tippy-content'>", "</span></span>"],
	 "div1": [
			["tei-div1[n]", function(elt) {
			 var numberValue = elt.getAttribute("n");
				 var p = document.createElement("template");
				 var numberSpan = '<span class="tei-number div-number">[' + numberValue + ']</span>';
				 p.innerHTML = numberSpan + elt.innerHTML;
				 return p.content;
			}]
	 ],
   "div2": [
			["tei-div2[n]", function(elt) {
			 var numberValue = elt.getAttribute("n");
				 var p = document.createElement("template");
				 var numberSpan = '<span class="tei-number div-number">[' + numberValue + ']</span>';
				 p.innerHTML = numberSpan + elt.innerHTML;
				 return p.content;
			}]
	 ],
	 "p": [
			["tei-p[n]", function(elt) {
				var numberValue = elt.getAttribute("n");
				var p = document.createElement("template");
				var numberSpan = document.createElement("span");
					numberSpan.setAttribute("class", "tei-number paragraph-number");
					numberSpan.textContent = '[¶ ' + numberValue + ']';
				p.innerHTML = numberSpan.outerHTML + elt.innerHTML;
				return p.content;
			}]
		]

	}
};
