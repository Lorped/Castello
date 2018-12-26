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


$IDutente=$_GET['id'];
$cosa=$_GET['sm'];
$delta=$_GET['delta'];


$MySql ="SELECT Sanita, Miti FROM personaggi WHERE IDutente = $IDutente";
$Result = mysql_query($MySql);
$res=mysql_fetch_array($Result);

$oldmiti=$res['Miti'];
$oldsanita=$res['Sanita'];

$MySql="UPDATE personaggio SET ";

if ($cosa=='S') {
	if ( $delta=='1' && $oldsanita < 10 && $oldsanita < 10-$oldmiti ) { $MySql = "UPDATE personaggi SET Sanita = Sanita +1 WHERE IDutente=$IDutente" ; }
	if ( $delta=='-1' && $oldsanita > 0 ) { $MySql = "UPDATE personaggi SET Sanita = Sanita -1 WHERE IDutente=$IDutente" ; }
}

if ($cosa=='M') {
	if ( $delta=='1' && $oldmiti < 10 && $oldsanita < 10-$oldmiti ) { $MySql = "UPDATE personaggi SET Miti = Miti +1 WHERE IDutente=$IDutente" ; }
	if ( $delta=='1' && $oldmiti < 10 && $oldsanita >= 10-$oldmiti ) { $MySql = "UPDATE personaggi SET Miti = Miti +1 , Sanita=Sanita-1 WHERE IDutente=$IDutente" ; }

	if ( $delta=='-1' && $oldmiti > 0 ) { $MySql = "UPDATE personaggi SET Miti = Miti -1 WHERE IDutente=$IDutente" ; }
}

$Result = mysql_query($MySql);


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
