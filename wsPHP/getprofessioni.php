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



$MySql="SELECT * FROM professioni  ";
$Result=mysql_query($MySql);
while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
	$idx=$res['IDprofessione'];

	$out2 = [];
	$Mysql2="SELECT * FROM bonusprof WHERE IDprofessione = $idx";
	$Result2=mysql_query($Mysql2);
	while ( $res2=mysql_fetch_array($Result2,MYSQL_ASSOC) ) {
		$out2 [] = $res2;
	}

	$out3 = [];
	$Mysql3="SELECT * FROM specializzazione WHERE IDprofessione = $idx";
	$Result3=mysql_query($Mysql3);
	while ( $res3=mysql_fetch_array($Result3,MYSQL_ASSOC) ) {
		$out3 [] = $res3;
	}

	$outx = [
		'prof' => $res,
		'bonus' => $out2,
		'spec' => $out3
	];

	$out [] = $outx;
}


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
