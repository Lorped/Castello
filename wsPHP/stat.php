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


$MySql="SELECT count(*) as s from utenti";
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);
$registrati=$res['s'];

$MySql="SELECT count(*) as s from personaggi";
$Result=mysql_query($MySql);
$res=mysql_fetch_array($Result);
$iscritti=$res['s'];


$MySql="SELECT P.nomeprofessione as n,
       Count(U.nomePG) as c ,
			 Count(U.nomePG) * 100.0 / ( select count(*) from personaggi) AS perc
FROM professioni P
LEFT OUTER JOIN personaggi U ON U.`IDprofessione` = P.`IDprofessione`
GROUP BY P.nomeprofessione";

$Result=mysql_query($MySql);
while ( $res=mysql_fetch_array($Result,MYSQL_ASSOC) ) {
	$out[] = $res;
}

$out1 = [
	"registrati" => $registrati ,
	"iscritti" => $iscritti ,
	"stat" => $out
] ;





header("HTTP/1.1 200 OK");
echo json_encode ($out1, JSON_UNESCAPED_UNICODE);


?>
