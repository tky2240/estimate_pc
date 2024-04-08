<?php
require 'vendor/autoload.php';

$composition_name = '';
if (isset($_GET['Name'])) {
  $encoded_composition_name = $_GET['Name'];
  $decode_composition_name_result = base64_decode($encoded_composition_name, true);
  if (is_string($decode_composition_name_result)) {
    $composition_name = $decode_composition_name_result;
  }
}
$total_price = '';
if (isset($_GET['Price'])) {
  $encoded_total_price = $_GET['Price'];
  $decode_total_price_result = base64_decode($encoded_total_price, true);
  if (is_string($decode_total_price_result)) {
    $total_price = $decode_total_price_result . "円";
  }
}

$dom = new IvoPetkov\HTML5DOMDocument();
$dom->loadHTMLFile('index.html');
$meta_tags = $dom->getElementsByTagName('meta');
foreach ($meta_tags as $meta_tag) {
  // https://www.php.net/manual/en/domnodelist.item.php
  if ($meta_tag->getAttribute('property') == 'og:title') {
    $meta_tag->setAttribute('content', $composition_name);
  }
  if ($meta_tag->getAttribute('property') == 'og:description') {
    $meta_tag->setAttribute('content', $total_price);
  }
}
echo $dom->saveHTML();
