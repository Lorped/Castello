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
$NomePG=mysqli_real_escape_string($db, $request->NomePG );
$CognomePG=mysqli_real_escape_string($db, $request->CognomePG );
$IDprofessione=mysqli_real_escape_string($db, $request->IDprofessione );
$IDspecial=mysqli_real_escape_string($db,  $request->IDspecial );
$IDbp=mysqli_real_escape_string($db, $request->IDbp );
$aaaa=mysqli_real_escape_string($db, $request->aaaa );
$mm=mysqli_real_escape_string($db, $request->mm );
$gg=mysqli_real_escape_string($db, $request->gg );
$xpg=mysqli_real_escape_string($db, $request->xpg );

/*
$id=$_GET['id'];
$token=$_GET['token'];
*/

$MasterAdmin=0;
$Userid=-1;


$MySql="SELECT * FROM personaggi WHERE IDutente = '$IDutente' ";
$Result=mysqli_query($db,$MySql);
if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }
if ($res=mysqli_fetch_array($Result)) {

	$MySql="UPDATE personaggi SET NomePG = '$NomePG' , CognomePG = '$CognomePG' , IDprofessione = $IDprofessione, IDspecial= $IDspecial, IDbp = $IDbp, aaaa = $aaaa, mm=$mm, gg=$gg, xspecpg=$xpg, Sanita=10, Miti=0, PF=3
	WHERE IDutente = '$IDutente' ";
	$Result=mysqli_query($db, $MySql);
	if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }
} else {
	$MySql="INSERT INTO personaggi (IDutente , NomePG, CognomePG, IDprofessione, IDspecial, IDbp, aaaa, mm, gg, xspecpg )
	VALUES ( '$IDutente' , '$NomePG' , '$CognomePG' , $IDprofessione, $IDspecial, $IDbp, $aaaa, $mm, $gg, $xpg ) ";
	$Result=mysqli_query($db,$MySql);
	if (mysqli_errno($db)) { die ( mysqli_errno($db).": ".mysqli_error($db). "  >>".$MySql ); }
}


/*************** Teologo o Ricercatore ******/
if ($IDspecial == 2  || $IDspecial == 18 || $xpg == 2 ) {
	$MySql="UPDATE personaggi SET Miti = 1 , Sanita = 9
	WHERE IDutente = '$IDutente' ";
	mysqli_query($db,$MySql);
}
/*************** Forze speciali  ******/
if ($IDspecial == 9 || $xpg == 9 ) {
	$MySql="UPDATE personaggi SET PF = 5
	WHERE IDutente = '$IDutente' ";
	mysqli_query($db, $MySql);
}


header("HTTP/1.1 200 OK");
$out=[];

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
