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

$Mysql="DELETE FROM oggetti WHERE IDoggetto='$IDoggetto' ";
mysqli_query($db,$Mysql);
$Mysql="DELETE FROM effetti WHERE IDoggetto='$IDoggetto' ";
mysqli_query($db,$Mysql);
$Mysql="DELETE FROM paired WHERE IDoggetto1='$IDoggetto' OR IDoggetto2='$IDoggetto' ";
mysqli_query($db,$Mysql);
if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }

header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
