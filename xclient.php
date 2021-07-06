<?php

class xclient
{

	private $client;

	private function init($url)
	{
		$this->client = curl_init($url);
		$h1 = "Cache-Control: no-cache";
		$h2 = "Content-Type: application/json";
		curl_setopt($this->client, CURLOPT_HTTPHEADER, array($h1, $h2));
		curl_setopt($this->client, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($this->client, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($this->client, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($this->client, CURLOPT_SSL_VERIFYPEER, 0);
	} // init

	private function updateField(&$arr, $field, $val)
	{
		if ($val != "") {
			$arr[$field] = $val;
		}
	} // updateField

	private function updateFieldArr(&$arr, $field, $val)
	{
		if (is_array($val) != "") {
			$arr[$field] = $val;
		}
	} // updateFieldArr

	private function bgetallcountrydetaill($wsuser, $wspwd)
	{
		$this->updateField($getallcountrydetaill, "wsuser", "WSITALCAMBIO");
		$this->updateField($getallcountrydetaill, "wspwd", "1cc61eb7ae2187eb91f97d1ae5300919");
		return $getallcountrydetaill;
	} // bgetallcountrydetaill

	function mgetallcountrydetaill($url = "https://www.italcontroller.com/italsisdev/includes/rest/SERVER/XATOXI/services.php")
	{
		$this->init($url);
		$getallcountrydetaill =  $this->bgetallcountrydetaill("WSITALCAMBIO", "1cc61eb7ae2187eb91f97d1ae5300919");
		$data["getallcountrydetaill"] = $getallcountrydetaill;
		$data_string = json_encode($data);
		curl_setopt($this->client, CURLOPT_POSTFIELDS, $data_string);
		$response = curl_exec($this->client);
		$result = json_decode($response);
		return ($result);
	} // mgetallcountrydetaill

	private function bgetcellphoneareacodel($wsuser, $wspwd, $countrycode)
	{
		$this->updateField($getcellphoneareacodel, "wsuser", "WSITALCAMBIO");
		$this->updateField($getcellphoneareacodel, "wspwd", "1cc61eb7ae2187eb91f97d1ae5300919");
		$this->updateField($getcellphoneareacodel, "countrycode", $countrycode);
		return $getcellphoneareacodel;
	} // bgetcellphoneareacodel

	function mgetcellphoneareacodel($countrycode, $url = "https://www.italcontroller.com/italsisdev/includes/rest/SERVER/XATOXI/services.php")
	{
		$this->init($url);
		$getcellphoneareacodel =  $this->bgetcellphoneareacodel("WSITALCAMBIO", "1cc61eb7ae2187eb91f97d1ae5300919", $countrycode);
		$data["getcellphoneareacodel"] = $getcellphoneareacodel;
		$data_string = json_encode($data);
		curl_setopt($this->client, CURLOPT_POSTFIELDS, $data_string);
		$response = curl_exec($this->client);
		$result = json_decode($response);
		return ($result);
	} // mgetcellphoneareacodel

	private function baddlead($wsuser, $wspwd, $code,  $idparty, $email, $imei, $contrycode, $areacode, $phoneNumber, $observation, $pin, $date, $pinfirstTime, $deviceid, $devicealt, $active, $deleted)
	{
		$this->updateField($addlead, "wsuser", "WSITALCAMBIO");
		$this->updateField($addlead, "wspwd", "1cc61eb7ae2187eb91f97d1ae5300919");
		$this->updateField($addlead, "code", $code);
		// $this->updateField($addlead, "name", $name);
		$this->updateField($addlead, "idparty", $idparty);
		$this->updateField($addlead, "email", $email);
		$this->updateField($addlead, "imei", $imei);
		$this->updateField($addlead, "contrycode", $contrycode);
		$this->updateField($addlead, "areacode", $areacode);
		$this->updateField($addlead, "phonenumber", $phoneNumber);
		$this->updateField($addlead, "observation", $observation);
		$this->updateField($addlead, "pin", $pin);
		$this->updateField($addlead, "date", $date);
		$this->updateField($addlead, "pinfirsttime", $pinfirstTime);
		$this->updateField($addlead, "deviceid", $deviceid);
		$this->updateField($addlead, "devicealt", $devicealt);
		$this->updateField($addlead, "active", $active);
		$this->updateField($addlead, "deleted", $deleted);
		return $addlead;
	} // baddlead

	function maddlead($code,  $idparty, $email, $imei, $contrycode, $areacode, $phoneNumber, $observation, $pin, $date, $pinfirstTime, $deviceid, $devicealt, $active, $deleted, $url = "https://www.italcontroller.com/italsisdev/includes/rest/SERVER/XATOXI/services.php")
	{
		$this->init($url);	
		$addlead =  $this->baddlead("WSITALCAMBIO", "1cc61eb7ae2187eb91f97d1ae5300919", $code,  $idparty, $email, $imei, $contrycode, $areacode, $phoneNumber, $observation, $pin, $date, $pinfirstTime, $deviceid, $devicealt, $active, $deleted);
		$data["addlead"] = $addlead;
		$data_string = json_encode($data);
		curl_setopt($this->client, CURLOPT_POSTFIELDS, $data_string);
		$response = curl_exec($this->client);
		$result = json_decode($response);
		return ($result);
	} // maddlead

} // class xclient