<?php

//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	exit(0);
}

include ('db.inc.php');


$IDoggetto=$_GET['id'];

$out = [];

$Mysql="SELECT * FROM oggetti ";
if ($IDoggetto!="") {
	$Mysql = $Mysql . "WHERE IDoggetto='$IDoggetto'";
}
$Result=mysql_query($Mysql);
while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
	$ogg = $res;

	$id=$res['IDoggetto'];

	$eff = [];
	$Mysql2 = "SELECT * from effetti
		LEFT JOIN professioni ON effetti.IDprofessione = professioni.IDprofessione
		WHERE IDoggetto = '$id'";
	$Result2=mysql_query($Mysql2);
	while ( $res2=mysql_fetch_array($Result2,MYSQL_ASSOC)) {
		$eff[] = $res2;
	}
	$pair = [];
	$Mysql3 = "SELECT *  from paired
		LEFT JOIN oggetti ON paired.IDoggetto2 = oggetti.IDoggetto
		WHERE IDoggetto1 = '$id'";
	$Result3=mysql_query($Mysql3);
	while ( $res3=mysql_fetch_array($Result3,MYSQL_ASSOC)) {
		$pair[] = $res3;
	}

	$out1 =[
		"ogg" => $ogg ,
		"eff" => $eff ,
		"pair" => $pair
	];

	$out [] = $out1 ;

}





header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
