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

$email = $request->email;
$password = $request->password;

// $email = "julien@home.com";
// $password = "kli0loth";

$email=mysqli_real_escape_string($db, $email);
$password=mysqli_real_escape_string($db, $password);


if (isset($postdata) && $email != "" && $password !="" ) {

	$MySql = "SELECT * FROM utenti WHERE email='$email' AND password='$password' ";
	$Result = mysqli_query($db, $MySql);


	if ( $res = mysqli_fetch_array($Result,MYSQLI_ASSOC)   ) {
		$out [] =$res;


		echo json_encode ($out, JSON_UNESCAPED_UNICODE);

		//
		//	Do a lot of other stuff !!
		//


		// FINE OPERAZIONI LOGIN

	} else {
		header("HTTP/1.1 401 Unauthorized");
	}

} else {
	header("HTTP/1.1 401 Unauthorized");
}


?>
