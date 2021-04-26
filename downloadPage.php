<?php

error_reporting(0);
include_once("xpresentationlayer.php");
include_once("xclient.php");
$serviceCall = new xclient("");

xpresentationLayer::startHtml("esp");
xpresentationLayer::buildHead2("Xatoxi");


xpresentationLayer::startMain("full-center bg-img j-content-center");
xpresentationLayer::buildDownloadSectionLanding();
xpresentationLayer::endMain();

xpresentationLayer::endHtml();
?>