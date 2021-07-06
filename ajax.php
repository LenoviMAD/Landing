<?php
include_once("xclient.php");
include_once("util.php");
$client = new xclient("");
$util = new Util;
session_start();

if (isset($_POST["cond"])) {
    if ($_POST["cond"] == "addlead") {
        $email = $_POST["email"];
        //$name = $_POST["name"];
        // $idparty = $_POST["idparty"];
        // $email = $_POST["email"];
        // $imei = $_POST["imei"];
        $contrycode = "";
        $areacode = "";
        $phonenumber = "";

        if ($_POST["contrycode"] !== "" && $_POST["areacode"] !== "" && $_POST["phonenumber"] !== "") {
            $contrycode = $_POST["contrycode"];
            $areacode = $_POST["areacode"];
            $phonenumber = $_POST["phonenumber"];
        }
        // $observation = $_POST["observation"];
        // $pin = $_POST["pin"];
        // $date = $_POST["date"];
        // $pinfirsttime = $_POST["pinfirsttime"];
        // $pin = $_POST["pin"];

        $data_json = $client->maddlead("",  "", $email, "", $contrycode, $areacode, $phonenumber, "", "", "", "", "", "", "Y", "N");
        print_r(json_encode($data_json));
    }
}