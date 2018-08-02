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

$IDutente=$request->token;
$NomePG=mysql_real_escape_string( $request->NomePG );
$CognomePG=mysql_real_escape_string( $request->CognomePG );
$IDprofessione=mysql_real_escape_string( $request->IDprofessione );
$DescProfessione=mysql_real_escape_string( $request->DescProfessione );

/*
$id=$_GET['id'];
$token=$_GET['token'];
*/

$MasterAdmin=0;
$Userid=-1;


$MySql="SELECT * FROM personaggi WHERE IDutente = '$IDutente' ";
$Result=mysql_query($MySql);
if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
if ($res=mysql_fetch_array($Result)) {

	$MySql="UPDATE personaggi SET NomePG = '$NomePG' , CognomePG = '$CognomePG' , IDprofessione = $IDprofessione, DescProfessione = '$DescProfessione'
	WHERE IDutente = '$IDutente' ";
	$Result=mysql_query($MySql);
	if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
} else {
	$MySql="INSERT INTO personaggi (IDutente , NomePG, CognomePG, IDprofessione, DescProfessione )
	VALUES ( '$IDutente' , '$NomePG' , '$CognomePG' , $IDprofessione, '$DescProfessione' ) ";
	$Result=mysql_query($MySql);
	if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
}

header("HTTP/1.1 200 OK");
$out=[];

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
