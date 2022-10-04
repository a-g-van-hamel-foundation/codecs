# CETEIcean extension for MediaWiki (beta)

The CETEIcean extension is an extension to MediaWiki which implements the JavaScript library [CETEIcean](https://github.com/TEIC/CETEIcean) (pronounce: `/sɪˈti:ʃn/`) to let users collaborate on and display [TEI XML](https://tei-c.org/) documents on the wiki. CETEIcean differs from other, typically XSLT-based methods of rendering TEI XML in that the web output uses Custom Elements (CE) of the Web Components standards, preserving much of the structure of the original document.

Its support for working with TEI XML is twofold: first, TEI XML documents can be created, edited and displayed in a dedicated namespace of the wiki; and second, a parser function (`#cetei`) can be used to embed documents, or even discrete sections of them, inline in wikitext.

This extension is being created for the CODECS website (https://codecs.vanhamel.nl), a project published by the [A. G. van Hamel Foundation for Celtic Studies](https://stichting.vanhamel.nl). It is currently in beta status and functionality at this stage is likely to be tied closely to the needs of the CODECS platform. It is not dependent on this environment, however, and you're welcome to try it out and provide feedback or patches.

## Usage and functionality

### Store and present documents
The extension creates a dedicated namespace with the `Cetei:` namespace prefix, which is where TEI XML documents can be stored and displayed.

#### 1. Text
The section headed "Text" renders the document. The TEI Header is hidden by default, but its visibility can be toggled on and off. A message appears instead if none has been provided.

#### 2. About
The section headed "About" is intended for metadata, i.e. information about the document. It lets you transclude wikitext content from a `/doc` subpage, similar to how the Scribunto extension lets you associate documentation pages with Lua modules. If you have installed Semantic MediaWiki, you can add semantic properties. Just be aware that it is up to you to prevent semantic information from becoming duplicated as a result of transclusion. The rationale is that it should be up to you whether semantic data gets attached to the document (through transclusion) or to the `/doc` subpage. See Customisation below for some help.

#### 3. Source code
To allow others to inspect the shape of the document and maybe learn from it, the raw source code is directly exposed in the final tabbed section.

### Edit documents

#### The text editor
To best assist your users in editing documents, it is recommended that you have both [CodeEditor](https://www.mediawiki.org/wiki/Extension:CodeEditor) and [WikiEditor](https://www.mediawiki.org/wiki/Extension:WikiEditor) installed on your wiki. Here is why:

##### The Ace code editor

The extension hooks into CodeEditor to support XML editing with Ace. [Ace](https://ace.c9.io) is a popular embeddable code editor whose features include colour-coded syntax highlighting, tabs, automatic indentation, line numbering, code folding and syntax checking.

##### The WikiEditor toolbar

The toolbar at the top that comes with WikiEditor is configured and extended to serve as an aid to writing (TEI) XML. CodeEditor adds some useful features, including search/replace, soft wrap, indentation and a button to let you toggle back and forth between CodeEditor and the regular WikiEditor interface in case you have need of it.

The CETEIcean extension extends the toolbar further by introducing
- a new booklet section, "TEI XML", which lets you insert elements and code snippets into the document. Please be aware that the present arrangement is basic and only provisional. It is currently organised into a number of categories, such as "Preliminaries", "Verse" and "Dictionaries", and will be revised, re-arranged and expanded in the future.
- a button to launch the editor in full-screen mode.

### The `#cetei` parser function

#### Full document
```
{{#cetei:doc=URL (mandatory)
}}
```

The `doc` parameter expects a full or local URL. This can refer to a wiki page, a document on the server, or if CORS is enabled for a particular remote source, an external document. To retrieve a wiki page, use either the `localurl` or `fullurl` magic word with the `action=raw` parameter, as shown below.

```
{{#cetei:doc={{localurl:Cetei:Some document|action=raw}}
}}
```

```
{{#cetei:doc=https://example.com/mywiki/my-tei-xml-file.xml
}}
```

#### Excerpts
You can also fetch an excerpt by element tag name (in the original XML), or by attribute and attribute value, or by a combination of both. This may be simplified to single selectors in the future.

```
{{#cetei:doc=URL (mandatory)
|el=
|attr=
|attrval=
}}
```

To retrieve an excerpt from the document by attribute, use the  `attr` and `attrval` parameters:
- `el` refers to the element (default: any)
- `attr` refers to the attribute. Mandatory if you use `attrval`.
- `attrval` refers the value of the attribute.

The following retrieves the paragraph where `xml:id` is `"p1"` :
```
{{#cetei:doc={{fullurl:Cetei:Some document|action=raw}}
|p=el
|attr=xml:id
|attrval=p1
}}
```

### Special:CETEIcean
The special page `Special:CETEIcean` contains basic information about the extension and lists pages in the `Cetei:` namespace.

## Setup

### Installation
- Download the files and add the folder (`Ceteicean`) to your `/extensions` folder.
- Enable the extension in your `LocalSettings.php` file:
```
wfLoadExtension( 'Ceteicean' );
define("NS_CETEI", 350);
define("NS_CETEI_TALK", 351);
```
Because MediaWiki does not support retrieving globals from extensions, the latter two lines may be required, for instance when you want to add the namespace to Semantic MediaWiki’s `$smwgNamespacesWithSemanticLinks`).
- Add configuration options (optional see below).
- Navigate to `Special:Version` on your wiki to verify that the extension is successfully installed.
- Make sure you have the WikiEditor and CodeEditor extensions installed (optional but recommended)
- You should be good to go.

### Configuration
#### $wgCeteiBehaviorsJsFile
The extension comes with a default set of [JavaScript behaviours](https://github.com/TEIC/CETEIcean/wiki/Anatomy-of-a-behaviors-object) intended to add “custom styles, event handlers, and widgets ... to your TEI elements”. This set, which is defined in the file `/modules/ext.ctc.behaviors.js`, is still somewhat experimental and may or may not suit your own particular use case. If you want, you can opt out and point the wiki to a file with your own custom behaviors. Add the following to your `LocalSettings.php`, after the lines that enable the extension, and substitute the file location.
```
$wgCeteiBehaviorsJsFile = '/example-my-custom-behaviors.js';
```
In your custom file, the configuration should be assigned to a variable named `configCustomBehaviors`.
```
var configCustomBehaviors = {
 "tei": {
     ...
 }
}
```

### Customisation
The extension comes with [system messages](https://www.mediawiki.org/wiki/Help:System_message) that can be customised if so desired. See the file `/i18n/en.json` (English only for now). The following examples are worth mentioning explicitly:
- If you require a button or link to be added to the top right of a page in the extension namepace, i.e. on the opposite end of the tabbed headers on the left, you can add it to `MediaWiki:Cetei-top-right-content` (an empty div by default).
- You are free to alter `MediaWiki:Cetei-edit-documentation-url` to set a different URL for the button that lets you edit the `/doc` subpage. The parameter `$1` will give you the title of that page. This can be useful if for instance, you prefer to use Page Forms or FlexForm instead of the regular wiki editor.

## Notes
### Limitations
- Definitions of character entities must be registered inline. The CETEIcean library does not yet support references to external DTDs. To make life easier, one of the booklets in the editor offers a default set of character definitions that can be inserted at the top of the document.
- It is mandatory that the TEI element contains a namespace declaration such as `xmlns="http://www.tei-c.org/ns/1.0"`.
- Because any content retrieved with the `#cetei` parser function is lazy-loaded, you cannot reuse it for new purposes in wikitext. For queries with XMLPath, see the ExternalData extension.
- When it comes to handling large documents (1MB or over), there are limits to processing power. In part, this is due to the usual restrictions relating to `$wgMaxArticleSize` and the HTTP/HTTPS connector request size, but other factors may come into play, too.
- This extension was not designed for a public wiki where anyone can edit. It is currently unknown if any additional security measures would be required.

### Known issues
- ACE tends not to play nice with character entity definitions and produces error warnings for every instance it fails to identify. In some documents, this may throw numerous error warnings saying "Entity not found", obscuring any messages that do matter. By way of a quick and dirty solution, you can hack into `CodeEditor/modules/ace/xml-worker.js` and suppress those warnings by commenting out the line beginning `ErrorHandler.error('entity not found:'+a)`. Make sure to purge cache afterwards, which you may have to attempt repeatedly because it can be stubborn.
- Syntax errors in your XML document may not always fail gracefully.
- It is possible that there are still issues relating to certain types of caching, such as parser cache. You may notice that after a page edit, the output does not represent the latest revision and that a hard refresh is required to fetch it.

### Developer notes
- Because this extension was written and tested with MW 1.35, which does not offer support for ES6 with ResourceLoader, the code in CETEIcean’s JS files has been transpiled to ES5 using [Babel js](https://babeljs.io) and a polyfill for custom elements is added as a dependency.
