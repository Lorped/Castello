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

$IDoggetto1 = $request->IDoggetto1;
$IDoggetto2 = $request->IDoggetto2;
$descrizione = mysql_real_escape_string($request->descrizione);
$effettomiti = $request->effettomiti;
$effettosan = $request->effettosan;
$effettopf= $request->effettopf;

$out = [];

$Mysql="INSERT INTO paired (IDoggetto1,IDoggetto2, pdescrizione, effettomiti, effettosan, effettopf)
	VALUES ($IDoggetto1,$IDoggetto2, '$descrizione' ,$effettomiti, $effettosan, $effettopf) ";
$Result=mysql_query($Mysql);
if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$Mysql ); }


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
