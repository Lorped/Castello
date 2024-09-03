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


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$nome = mysqli_real_escape_string($db, $request->nome);
$descrizione = mysqli_real_escape_string($db, $request->descrizione);
$basemiti = $request->basemiti;
$basesan = $request->basesan;
$basepf= $request->basepf;

$barcode=rand(100000000000,999999999999);
$out = [];

$Mysql="INSERT INTO oggetti ( scan, nome, descrizione, basemiti, basesan, basepf)
	VALUES ('$barcode', '$nome', '$descrizione', $basemiti, $basesan, $basepf ) ";
$Result=mysqli_query($db, $Mysql);


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
