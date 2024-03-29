# Custom IIIF manifests for CODECS

[CODECS](https://codecs.vanhamel.nl) has entries for manuscripts as they exist today, for individual manuscript units that are thought to have independent histories prior to their inclusion, and for manuscripts that are to some extent historically reconstructed, especially even if fragments reside in different repositories today. 

It is because of these latter two categories in particular that it has proven useful to derive new [IIIF](https://github.com/iiif) manifests from existing ones. A number of these derivative manifests have been created using the [Bodleian’s IIIF Manifest Editor](https://github.com/bodleian/iiif-manifest-editor) and the end product is exhibited on the CODECS website using Mirador. 

Another use case, although it has yet to be looked into more thoroughly, is the creation of annotated manifests. In current JSON-based data models, annotations can be [embedded, referenced or both](https://iiif.io/api/cookbook/recipe/0269-embedded-or-referenced-annotations/), but whichever approach one takes requires modifications to the manifest and in effect, the creation of derivative versions. Truly external annotations are possible only when one sets up an annotation server, such as Simple Annotation Server (which runs on Java and works with Mirador), Annotot or Elucidate. 

One concern that has not been addressed is that of version history. If the original manifest were corrected or changed in some other way, there is no way of signalling automatically that such a thing ever occurred. It might be helpful if all ‘canonical’ versions of manifests were stored in repositories using Git technology (like Github). 
