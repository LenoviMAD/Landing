<?php

error_reporting(0);
include_once("xpresentationlayer.php");
include_once("xclient.php");
$serviceCall = new xclient("");

xpresentationLayer::startHtml("esp");
xpresentationLayer::buildHead2("Xatoxi");


xpresentationLayer::startMain("full-center bg-img");
xpresentationLayer::buildHeaderLanding("73 años con Venezuela");
xpresentationLayer::startSectionTwoColumns();
xpresentationLayer::buildInputTextGridCustom2("EmailDiv","Email", "email", "email", "", "", "input-field1", "required", "", "", "(*) Campo obligatorio");
$data_jsonAreaPhone = $serviceCall->mgetallcountrydetaill();

$data_jsonCodePhone = $serviceCall->mgetcellphoneareacodel("58");
xpresentationLayer::buildPhoneComplete("Movil", "codeCountry", "codeArea",  "phone", "codeCountry", "codeArea",  "phone", $data_jsonAreaPhone, $data_jsonCodePhone, "");
// xpresentationLayer::buildInputTextGrid("Número de teléfono", "numberMovil", "numberMovil", "", "", "input-field1");

include './modals/loader.php';
include './modals/modalWrong.php';
xpresentationLayer::buildButtonImageLanding();
xpresentationLayer::endSection();
xpresentationLayer::endMain();

xpresentationLayer::endHtml();
?>