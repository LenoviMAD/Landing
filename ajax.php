<?php
include_once("xclient.php");
include_once("util.php");
$client = new xclient("");
$util = new Util;
session_start();

//Se llama al servicio para llenar el select hijo
if (isset($_GET["cond"])) {
    if ($_GET["cond"] == "mgetproviderl") {
        $data_json = $client->mgetproviderl($_GET["valor0"]);
        print_r(json_encode($data_json));
    }

    if ($_GET["cond"] == "mgetcellphoneareacodel") {

        $data_json = $client->mgetcellphoneareacodel($_GET["valor0"]);
        print_r(json_encode($data_json));
    }

    if ($_GET["cond"] == "mgetcurrencysrcl") {
        $data_json = $client->mgetcurrencysrcl($_GET["valor0"]);
        print_r(json_encode($data_json));
    }

    if ($_GET["cond"] == "mgetinstrumentdstl") {
        $data_json = $client->mgetinstrumentdstl($_GET["valor0"], $_GET["valor1"]);
        print_r(json_encode($data_json));
    }

    if ($_GET["cond"] == "mgetcurrencydstl") {
        $data_json = $client->mgetcurrencydstl($_GET["valor0"], $_GET["valor1"], $_GET["valor2"]);
        print_r(json_encode($data_json));
    }

    if ($_GET["cond"] == "mgetremitancetypel") {
        $data_json = $client->mgetremitancetypel($_GET["valor0"]);
        print_r(json_encode($data_json));
    }

    if ($_GET["cond"] == "mcalcsend") {
        $data_json = $client->mcalcsend(1, $_GET["valor0"], $_GET["valor1"], $_GET["valor2"]);
        print_r(json_encode($data_json));
    }
}

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