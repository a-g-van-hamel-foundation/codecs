<?php

class ctcXPath {

  private function getSimpleXML( $xmlString ) {
      $xml = simplexml_load_string( $xmlString, 'SimpleXMLElement' );
      $xml->registerXPathNamespace("def", "http://www.tei-c.org/ns/1.0");
      return $xml;
  }

  public function getHeaderTitle( $xmlString ) {
      $xml = self::getSimpleXML( $xmlString );
      $headerTitle = $xml->xpath("//def:teiHeader//def:title");
      if ( count($headerTitle) > 0 ) {
        foreach ($headerTitle as $title) {
            $value = strip_tags( $title );
            return $value;
          }
        } else {
          return false;
      }
  }

  /* Returns true/false depending on presence of TEI Header */
  public function hasTEIHeader( $xmlString ) {
    $xml = self::getSimpleXML( $xmlString );
    $teiHeader = $xml->xpath("//def:teiHeader");
    if ( count($teiHeader) > 0 ) {
      return true;
    } else {
      return false;
    }
  }


}
