/*
useCodeMirror = mw.user.options.get( 'usecodemirror' ) > 0;
api = new mw.Api();
* Available only in the cetei namespace (NS_350)
*/
var $textbox1 = $( '.ns-350 #wpTextbox1' );

/* Callback - @TODO: make it possible to see #bodyContent / .bodyContent in fullscreen */
//var elemForFullScreen = document.getElementById("bodyContent");
var openFullScreen = function openFullscreen() {
  el = document.getElementsByClassName("wikiEditor-ui")[0];
  //el = document.getElementById("content");
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) { /* Safari */
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) { /* IE11 */
    ele.msRequestFullscreen();
  }
};
var exitFullScreen = function exitFullscreen() {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  }
  else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  }
  else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
  }
  else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  }
};

/* Adds booklet to WikiEditor */
function addTEIXMLToWikiEditor( $textbox ) {
  //var $codeMirrorButton;

  var config = {
    sections: {
      teixml: {
        type: 'booklet',
        label: 'TEI XML',
        icon: 'https://commons.wikimedia.org/wiki/File:Text_Encoding_InitiativeTEI_Logo.svg',
        pages: {
          tei0: {
            layout: 'characters',
            label: 'Preliminaries',
            characters: [
              {
                label: 'teiHeader (prefilled)',
                action: {
                  type: 'encapsulate',
                  options: {
                    pre: '<teiHeader date.created="" date.updated="">',
                    peri: '\n\t<fileDesc>\n\t\t<titleStmt>\n\t\t<title></title>\n\t\t<author></author>\n\t\t<editor></editor>\n\t\t</titleStmt>\n\t\t<publicationStmt><p></p></publicationStmt>\n\t\t<sourceDesc><p></p></sourceDesc>\n\t</fileDesc>\n\t<encodingDesc></encodingDesc>\n\t<profileDesc></profileDesc>\n\t<xenoData></xenoData>\n\t<revisionDesc></revisionDesc>',
                    post: '\n</teiHeader>'
                  }
                }
              },
              {
                label: 'Character entities (set)',
                action: {
                  type: 'encapsulate',
                  options: {
                    pre: '<!DOCTYPE TEI [',
                    peri: '<!ENTITY ampersir "⁊" ><!ENTITY ndash "–"><!ENTITY mdash "—"><!ENTITY AElig "Æ" ><!ENTITY aelig "æ" ><!ENTITY amacr "ā" ><!ENTITY Amacr "Ā" ><!ENTITY amacr "ā" ><!ENTITY Amacr "Ā" ><!ENTITY emacr "ē" ><!ENTITY Emacr "Ē" ><!ENTITY Imacr "Ī" ><!ENTITY imacr "ī" ><!ENTITY Omacr "Ō" ><!ENTITY omacr "ō" ><!ENTITY umacr "ū" ><!ENTITY Umacr "Ū" ><!ENTITY smacr "s̄" ><!ENTITY mmacr "m̄" ><!ENTITY rmacr "r" ><!ENTITY macr " " ><!ENTITY aacute "á" ><!ENTITY Aacute "Á" ><!ENTITY eacute "é" ><!ENTITY Eacute "É" ><!ENTITY iacute "í" ><!ENTITY Iacute "Í" ><!ENTITY oacute "ó" ><!ENTITY Oacute "Ó" ><!ENTITY uacute "ú" ><!ENTITY Uacute "Ú" ><!ENTITY Agrave "À" ><!ENTITY agrave "à" ><!ENTITY Egrave "È" ><!ENTITY egrave "è" ><!ENTITY Igrave "Ì" ><!ENTITY igrave "ì" ><!ENTITY Ograve "Ò" ><!ENTITY ograve "ò" ><!ENTITY Ugrave "Ù" ><!ENTITY ugrave "ù" ><!ENTITY auml "ä" ><!ENTITY Auml "Ä" ><!ENTITY euml "ë" ><!ENTITY Euml "Ë" ><!ENTITY iuml "ï" ><!ENTITY Iuml "Ï" ><!ENTITY ouml "ö" ><!ENTITY Ouml "Ö" ><!ENTITY uuml "ü" ><!ENTITY Uuml "Ü" ><!ENTITY Fdot "Fh" ><!ENTITY fdot "fh" ><!ENTITY Mdot "Mh" ><!ENTITY mdot "mh" ><!ENTITY Ndot "Ṅ" ><!ENTITY ndot "ṅ" ><!ENTITY Sdot "Ṡ" ><!ENTITY sdot "ṡ" ><!ENTITY eogon "ę" ><!ENTITY Eogon "Ę" ><!ENTITY Acaron "Ǎ"><!ENTITY acaron "ǎ"><!ENTITY Ccaron "Č"><!ENTITY ccaron "č"><!ENTITY Ecaron "Ě"><!ENTITY ecaron "ě" ><!ENTITY Gcaron "Ǧ"><!ENTITY gcaron "ǧ" ><!ENTITY Icaron "Ǐ"><!ENTITY icaron "ǐ" ><!ENTITY Ocaron "Ǒ"><!ENTITY ocaron "ǒ" ><!ENTITY Scaron "Š"><!ENTITY scaron "š" ><!ENTITY Ucaron "Ǔ"><!ENTITY ucaron "ǔ" >',
                    post: ']>'
                  }
                }
              },
              addEncapsChar( 'notesStmt' ),
              addEncapsChar( 'note' ),
              addEncapsChar( 'publisher' ),
              addEncapsChar( 'pubPlace' ),
              addEncapsChar( 'date', 'date@when', 'when=""' ),
              addEncapsChar( 'availability' )
            ]
          },
          tei3: {
            label: 'Common elements',
            //labelMsg: 'special-characters-group-latin',
            layout: 'characters',
            characters: [
              addEncapsChar( 'p' ),
              addEncapsChar( 'expan' ),
              addEncapsChar( 'ex', 'ex' ),
              addEncapsChar( 'abbr' ),
              addEncapsChar( 'choice' )
            ]
          },
          tei6: {
            label: 'Verse',
            layout: 'characters',
            characters: [
              addEncapsChar( 'lg' ),
              addEncapsChar( 'l' ),
              addEncapsChar( 'l', 'l@n', 'n=""' ),
              addEncapsChar( 'lb' ),
              addEncapsChar( 'seg' ),
              addEncapsChar( 'caesura' ),
              addEncapsChar( 'rhyme' ),
              {
                label: 'lg (quatrain)',
                action: {
                  type: 'encapsulate',
                  options: {
                    pre: '<lg n="" type="quatrain">\n<l n="">',
                    peri: '',
                    post: '</l>\n<l n=""></l>\n<l n=""></l>\n<l n=""></l>\n</lg>'
                  }
                }
              },
              {
                label: 'lg (englyn)',
                action: {
                  type: 'encapsulate',
                  options: {
                    pre: '<lg n="" type="englyn">\n<l n="">',
                    peri: '',
                    post: '</l>\n<l n=""></l>\n<l n=""></l>\n</lg>'
                  }
                }
              }
            ]
          },
          tei9: {
            label: 'Dictionaries',
            layout: 'characters',
            characters: [
              addEncapsChar( 'text' ),
              addEncapsChar( 'front', 'front (matter)' ),
              addEncapsChar( 'body' ),
              addEncapsChar( 'back', 'back (matter)' ),
              addEncapsChar( 'div' ),
              addEncapsChar( 'entry' ),
              addEncapsChar( 'entryFree' ),
              addEncapsChar( 'superEntry' ),
              addEncapsChar( 'form' ),
              addEncapsChar( 'orth' ),
              addEncapsChar( 'hyph' ),
              addEncapsChar( 'pron' ),
              addEncapsChar( 'gramGrp' ),
              addEncapsChar( 'pos' ),
              addEncapsChar( 'def' )
            ]
          },
          tei10: {
            label: 'Manuscripts',
            layout: 'characters',
            characters: [
              addEncapsChar( 'msIdentifier' ),
              addEncapsChar( 'head' ),
              addEncapsChar( 'msContents' ),
              addEncapsChar( 'physDesc' ),
              addEncapsChar( 'history' ),
              addEncapsChar( 'msPart' ),
              addEncapsChar( 'msFrag' ),
              addEncapsChar( 'locus' ),
              addEncapsChar( 'locusGrp' ),
              addEncapsChar( 'rubric' ),
              addEncapsChar( 'incipit' ),
              addEncapsChar( 'explicit' ),
              addEncapsChar( 'catchwords' ),
              addEncapsChar( 'signatures' )
            ]
          },
          tei12: {
            label: 'Critical apparatus',
            layout: 'characters',
            characters: [
              addEncapsChar( 'app' ),
              addEncapsChar( 'rdg' ),
              addEncapsChar( 'rdgGrp', 'rdgGrp@type', 'type=""' ),
              addEncapsChar( 'note' ),
              addEncapsChar( 'lem' ),
              addEncapsChar( 'lem' ),
              addEncapsChar( 'witDetail', 'witDetail@wit', 'wit=""'),
              addEncapsChar( 'mentioned' ),
              addEncapsChar( 'ref' )
            ]
          },
          tei13: {
            label: 'Names, dates, entities',
            layout: 'characters',
            class: 'tei-chars',
            characters: [
              addEncapsChar( 'listPerson' ),
              addEncapsChar( 'persName' ),
              addEncapsChar( 'foreName' ),
              addEncapsChar( 'surName' ),
              addEncapsChar( 'roleName' ),
              addEncapsChar( 'addName' ),
              addEncapsChar( 'genName' ),
              addEncapsChar( 'nameLink' ),
              addEncapsChar( 'placeName' ),
              addEncapsChar( 'listPlace' ),
              addEncapsChar( 'location' ),
              addEncapsChar( 'geo' ),

              addEncapsChar( 'state' ),
              addEncapsChar( 'trait' ),
              addEncapsChar( 'event' ),
              addEncapsChar( 'listEvent' ),
              addEncapsChar( 'trait' ),
              addEncapsChar( 'idno' )
            ]
          },

          tei16: {
            label: 'Linking, segmentation, alignment',
            layout: 'characters',
            characters: [
              addEncapsChar( 'link', 'link@target', 'target=""'),
              addEncapsChar( 'ptr', 'ptr@target', 'target=""'),
              addEncapsChar( 'standOff' ),
              {
                label: 'standOff (pre-filled)',
                action: {
                  type: 'encapsulate',
                  options: {
                    pre: '<standOff>\n\t<listPerson>\n\t<person xml:id="">\n\t\t<persName></persName>\n\t</person>\n\t</listPerson>',
                    peri: '',
                    post: '\n\t<listPlace>\n\t<place xml:id="">\n\t\t<placeName></placeName>\n\t</place>\n\t</listPlace>\n</standOff>'
                  }
                }
              },
              addEncapsChar( 'listPerson' ),
              addEncapsChar( 'person', 'person@xml:id', 'xml:id=""' ),
              addEncapsChar( 'listPlace' ),
              addEncapsChar( 'place', 'place@xml:id', 'xml:id=""' ),
              addEncapsChar( 'listAnnotation' ),
              addEncapsChar( 'annotation' ),
              addEncapsChar( 'respStmt' ),
              addEncapsChar( 'resp' ),
              addEncapsChar( 'revisionDesc' ),
              addEncapsChar( 'change' )

            ]
          },

          teiRef: {
      			layout: 'table',
      			label: 'About',
      			headings: [
      				{ text: 'Links' } // or use textMsg for localization, see also above
      			],
      			rows: [
              {
                name: {
                  html: '<a href="https://tei-c.org/release/doc/tei-p5-doc/en/html/index.html">TEI P5 Guidelines (English)</a>'
                }
              }
            ]
          }

        } //pages
        //
      }, //teixml

      rightmenu: {
        label: 'View',
        type: 'toolbar',
        groups: {
          screentoggle: {

            tools: {
              fullscreen: {
                type: 'button',
                class: 'open-fullscreen',
                label: 'Full screen',
                oouiIcon: 'fullScreen',
                action: {
                  type: 'callback',
                  execute: openFullScreen
                } //action
              }, //fullscreen
              exitfullscreen: {
                type: 'button',
                class: 'exit-fullscreen',
                label: 'Exit full screen',
                oouiIcon: 'exitFullscreen',
                action: {
                  type: 'callback',
                  execute: exitFullScreen
                } //action
              } //fullscreen
            } //tools

          } //screentoggle
        } //groups
      } //rightmenu

    }// sections

  } //

  $textbox.wikiEditor( 'addToToolbar', config );
  $( '.group-screentoggle' ).insertBefore( '.sections' );

}

/* Follows this pattern:
{
  label: 'abbr',
  action: {
    type: 'encapsulate',
    options: {
      pre: '<abbr>',
      peri: '',
      post: '</abbr>'
    }
  }
},
*/

/*
Element, label for element, possible attributes you might want to add
*/
function addEncapsChar ( name, label = name, add = '' ) {

    var charObj = {};
    var label = label;
    var action = {};
    var type = 'encapsulate';
    var options = {};

    var peri = '';
    if ( add !== '' && add !== null ) {
        var pre = '<' + name + ' ' + add + '>';
    } else {
      var pre = '<' + name + '>';
    }
    var post =  '</' + name + '>';
    options.pre = pre;
    options.peri = peri;
    options.post = post;
    action.options = options;
    action.type = type;

    charObj.label = label;
    charObj.action = action;

    return charObj;

}

/* For later use: cannot yet return multiple character object

function addEncapsChars ( names ) {
    name = '';
    //this.characters = [];
    charArray = [];

  for ( var i in names ) {
    name = names[i];
    charArray.push( new addEncapsChar( name ) );
    //Object.assign(charArray, new addEncapsChar( name ) );
  }
  //outputObj = '';
  //Object.assign(outputObj, [ charArray ] );
  //return outputObj;

  var str = JSON.stringify( [ charArray ] );
  var obj = JSON.parse( str );
  return obj;

}
*/




/* Invoke and load after initial assets */

$( $textbox1 ).on( 'wikiEditor-toolbar-doneInitialSections', function () {
    addTEIXMLToWikiEditor( $textbox1 );
} );
