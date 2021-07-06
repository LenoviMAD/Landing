<?php

session_start();

/*==========================================================================  
     Class: xpresentationLayer
     Description: MVC View. XATOXI Helper Methods
     Version: 1.0
     Remarks:
     ========================================================================*/

class xpresentationLayer
{	

	/*=======================================================================
    Function: startHtml
    Description: HTML TAG START according to language "lang"
    Parameters: $lang <--
    Algorithm:
    Remarks:
    Standarized: 2021/01/18 09:40
    ===================================================================== */
	static function startHtml($lang)
	{
		echo '<!DOCTYPE html>';
		echo '<HTML lang="' . $lang . '">';
	} // startHtml

	/*=======================================================================
    Function: buildHead2
    Description: HTML Head, rendering "title"
    Parameters: $title <-- name of App
    Algorithm:
    Remarks:
    Standarized: 2021/01/18 09:40
    ===================================================================== */

	static function buildHead2($title)
	{
		echo  '<HEAD>';
		echo  ' <TITLE>' . $title . '</TITLE> ';
		echo  ' <META charset="UTF-8"> ';
		echo  ' <META name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/style.css"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/animations.css"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/modal.css"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/loader.css"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/helpers.css"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/buttons.css"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/cards.css"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/inputs.css"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/titles.css"> ';
		echo  ' <LINK rel="stylesheet" type="text/css" href="css/landing.css"> ';
		// echo  ' <LINK rel="stylesheet" type="text/css" href="css/mediaqueries.css"> ';

		echo '		<!-- Global site tag (gtag.js) - Google Analytics -->';
		echo '<SCRIPT async src="https://www.googletagmanager.com/gtag/js?id=UA-193322614-1"></SCRIPT>';
		echo '<SCRIPT>';
		echo '	window.dataLayer = window.dataLayer || [];';
		echo '	function gtag(){dataLayer.push(arguments);}';
		echo '	gtag("js", new Date());';
		echo '  gtag("config", "UA-193322614-1");';
		echo '</SCRIPT>';
		echo  ' </HEAD> ';
	} //buildHead

	/*=======================================================================
    Function: startMain
    Description: Empieza tag MAIN 
    Parameters: 
    Algorithm:
    Remarks:
    Standarized: 2021/01/18 14:00
    ===================================================================== */
	static function startMain($class = "")
	{
		if ($class != "") {
			$class = ' class="wrapper ' . $class . '" ';
		} else {
			$class = ' class="wrapper" ';
		}

		echo '<DIV class="phone-big">';
		echo '<MAIN ' . $class . '>';
	} // startMain

	/*=======================================================================
    Function: buildHeaderLanding
    Description: Construye el encabezado de la landing page xatoxi 
    Parameters: 
    Algorithm:
    Remarks:
    Standarized: 2021/03/26 16:40
    ===================================================================== */
	static function buildHeaderLanding($title)
	{
		echo '<HEADER class="text-center">';
		echo '<FIGURE>';
		echo '        <IMG class="logo" src="img/logo.png">';
		echo '</FIGURE>';
		echo '<H1 class="title__download mt0">';
		echo '        <SMALL>' . $title . '</SMALL>';
		echo '</H1>';
		echo '</HEADER>';
	} // buildHeaderLanding

	/*=======================================================================
    Function: startSectionTwoColumns
    Description: Start Tag SECTION  (SecondSection) with 2 columns
    Parameters: 
    Algorithm:
    Remarks:
    Standarized: 2021/01/18 14:00
    ===================================================================== */
	static function startSectionTwoColumns($class = "")
	{
		if ($class != "") {
			$class = ' class="' . $class . '" ';
		} else {
			$class = ' class="grid-2" ';
		}

		echo '<SECTION ' . $class . ' id="mainMenu">';
	} //startSectionTwoColumns

	/*=======================================================================
    Function: buildInputTextGridCustom2
    Description: Input text (2 columns)
    Parameters: $titleLabel <-- Label Name
                $idInput <-- Input Id
                $nameInput <-- Input Nme
                $placeholder <-- Name Show Field
    Algorithm:
    Remarks:
    Standarized: 2021/01/19 12:00
    ===================================================================== */
	static function buildInputTextGridCustom2($idDiv, $titleLabel, $idInput, $nameInput, $placeholder = "", $maxLength = "", $customClass = "", $classLabel = "", $disabled = "", $classInput = "", $textHelp = "")
	{
		if ($disabled != "") {
			$disabled = 'disabled="' . $disabled . '"';
		}

		if ($classInput != "") {
			$classInput = 'class="' . $classInput . ' input-radius"';
		} else {
			$classInput = 'class="grid-item-no-border input-radius"';
		}

		echo '<DIV class="' . $customClass . ' " id="' . $idDiv . '">';
		echo ' <LABEL class="font-Bold font-white ' . $classLabel . '">' . $titleLabel . '</LABEL>';
		echo ' <INPUT ' . $disabled . ' type="text" name="' . $nameInput . '" id="' . $idInput . '" placeholder="' . $placeholder . '" maxlength="' . $maxLength . '" ' . $classInput . '>';
		if ($textHelp != "") {
			echo '<SPAN class="helper-text " data-error="wrong" data-success="right">' . $textHelp . '</SPAN>';
		}


		echo '</DIV>';
	} //buildInputTextGridCustom2
	
	/*=======================================================================
    Function: buildPhoneComplete
    Description: Build section phones witch country phone, area cod and number (Fields Centers)
    Parameters: $titleLabel <- label title
                $nameCountry <- name select country
                $nameArea  <- name select country
                $namePhone <- name phone
                $idCountry <- id select country
                $idArea <- id select country
                $idPhone <- id phone
                $jsonCode <- json for select code country
                $jsonArea <- json for select code area for country
                $event  <- to call a event in the select   
    Algorithm:
    Remarks:
    Standarized: 2021/01/20 12:00
    ===================================================================== */
	static function buildPhoneComplete($titleLabel, $nameCountry, $nameArea, $namePhone, $idCountry, $idArea, $idPhone, $jsonCode, $jsonArea, $event = "")
	{

		$data = $jsonCode->list;
		$data2 = $jsonArea->list;

		if ($event != "") {
			$event = 'onchange="' . $event . '"';
		}

		echo '<DIV class="input-field1"> ';
		echo '  <LABEL class="font-Bold font-white margin-label">' . $titleLabel . '</LABEL>';
		echo '  <DIV class="flex-content">';
		echo '<SELECT name="' . $nameCountry . '" id="' . $idCountry . '" ' . $event . ' class="select-width">';
		echo '<OPTION disabled selected>Seleccione</OPTION>';
		foreach ($data as $value) {
			if ($value->internationalphonecode != "58") {
				echo '<OPTION value="' . $value->id . '" >' . $value->internationalphonecode . ' </OPTION>';
			} else {
				echo '<OPTION value="' . $value->id . '" selected>' . $value->internationalphonecode . ' </OPTION>';
			}
		}
		echo '</SELECT>';
		echo '<SELECT name="' . $nameArea . '" id="' . $idArea . '" class="select-width">';
		echo '<OPTION disabled selected>Seleccione</OPTION>';
		foreach ($data2 as $value) {
			echo '<OPTION value="' . $value->id . '" >' . $value->code . ' </OPTION>';
		}
		echo '</SELECT>';

		echo '    <INPUT type="text" name="' . $namePhone . '" id="' . $idPhone . '" class="grid-item-no-border input-radius"  maxlength="7" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;">';
		echo '  </DIV>';
		echo '</DIV>';
	} //buildPhoneComplete

	/*=======================================================================
	Function: buildButtonImageLanding
	Description: Build button and img of landing page
	Parameters: 
	Algorithm:
	Remarks:
	Standarized: 2021/03/26 16:50
	===================================================================== */
	static function buildButtonImageLanding()
	{
		echo '<DIV class="grid-item-2 text-center">';
		echo '<BUTTON class="btn btn-large btn-semirounded" id="sendButtom">REGISTRAR</BUTTON>';
		echo '</DIV>';
		echo '<DIV class="grid-item-2 text-center">';
		echo '        <FIGURE class="icon-phone">';
		echo '                <IMG src="./img/app.png" alt="funcionalidades">';
		echo '        </FIGURE>';
		echo '</DIV>';
	} //buildButtonImageLanding

	/*=======================================================================
    Function: endSection
    Description: End tag SECTION 
    Algorithm:
    Remarks:
    Standarized: 2021/01/18 14:00
    ===================================================================== */
	static function endSection()
	{
		echo ' </SECTION>';
	} //endSection

	/*=======================================================================
    Function: endMain
    Description: Finaliza el tag MAIN
    Parameters: 
    Algorithm:
    Remarks:
    Standarized: 2021/01/18 14:00
    ===================================================================== */
	static function endMain()
	{
		echo '</MAIN>';
		echo '</DIV>';
	} // endMain

	/*=======================================================================
    Function: endHtml
    Description: HTML TAG END and add the file .js
    Parameters:
    Algorithm:
    Remarks:
    Standarized: 2021/01/18 09:40
    ===================================================================== */
	static function endHtml()
	{
		echo '</HTML>';
		echo  ' <SCRIPT src="italcambio\js/main2.js" type="module"></SCRIPT>';
		echo  ' <SCRIPT src="italcambio\js/main.js" language="javascript" type="text/javascript"></SCRIPT>';
	} // endHtml

	/*=======================================================================
	Function: buildDownloadSectionLanding
	Description: Build content of downloadpage
	Parameters: 
	Algorithm:
	Remarks:
	Standarized: 2021/03/26 16:50
	===================================================================== */
	static function buildDownloadSectionLanding()
	{
		echo '<HEADER class="text-center">';
		echo '<FIGURE>';
		echo '        <img class="logo" src="img/logo.png">';
		echo '</FIGURE>';
		echo '<H1 class="title__download mt0">';
		echo '        <small>Descarga</small>';
		echo '</H1>';
		echo '</HEADER>';
		echo '<DIB class="downloadApp">';
		echo '    <A href="https://play.google.com/store/apps/details?id=com.grupoitalcambio.ico&hl=es_VE&gl=US" class="btn-Download">';
		echo '        <FIGURE><IMG src="./img/googlestore.png" alt="Google store"></FIGURE>';
		echo '    </A>';
		echo '    <A href="https://apps.apple.com/ve/app/italcambio/id1561289510" class="btn-Download">';
		echo '        <FIGURE><IMG src="./img/appstore.png" alt="App store"></FIGURE>';
		echo '    </A>';
		echo '</DIB>';
	} //buildDownloadSectionLanding

} // xpresentationLayer