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

$IDoggetto = $request->IDoggetto;
$nome = mysqli_real_escape_string($db,$request->nome);
$descrizione = mysqli_real_escape_string($db,$request->descrizione);
$basemiti = $request->basemiti;
$basesan = $request->basesan;
$basepf= $request->basepf;

$flagdomanda = $request->flagdomanda;
$domanda = mysqli_real_escape_string($db,$request->domanda);
$r1 = mysqli_real_escape_string($db,$request->r1);
$r2 = mysqli_real_escape_string($db,$request->r2);
$rispsan = $request->rispsan;
$rispmiti = $request->rispmiti;
$risppf = $request->risppf;


$flagpassword = $request->flagpassword;
$richiesta = mysqli_real_escape_string($db,$request->richiesta);
$password = mysqli_real_escape_string($db,$request->password);
$passwdok = mysqli_real_escape_string($db,$request->passwdok);

$out = [];

$Mysql="UPDATE oggetti SET nome='$nome', descrizione='$descrizione', basemiti=$basemiti, basesan=$basesan, basepf=$basepf ,
flagdomanda='$flagdomanda', domanda='$domanda', r1='$r1', r2='$r2', rispsan=$rispsan, rispmiti=$rispmiti, risppf=$risppf,
flagpassword='$flagpassword', richiesta='$richiesta', password='$password', passwdok='$passwdok'
	WHERE IDoggetto=$IDoggetto";
$Result=mysqli_query($db,$Mysql);


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
