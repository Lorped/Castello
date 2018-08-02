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



$IDutente=$_POST['token'];

/*
$id=$_GET['id'];
$token=$_GET['token'];
*/

$MasterAdmin=0;
$Userid=-1;




$target_path = "/web/htdocs/www.roma-by-night.it/home/Castello/assets/imgs/";
$filename=urlencode ( basename( $_FILES['fileKey']['name']) );

$ext = pathinfo($filename, PATHINFO_EXTENSION);

$newfilebase=$IDutente.uniqid('Cas', true).'.'.$ext;
$newfile=$target_path.$newfilebase;

/*
header("HTTP/1.1 200 OK");
$xx=getcwd();
$out=['rc' => $rc, 'old' => $_FILES['fileKey']['tmp_name'], 'pwd' => $xx  ];
echo json_encode ($out, JSON_UNESCAPED_UNICODE);
die();
*/

$rc=move_uploaded_file($_FILES['fileKey']['tmp_name'], $newfile);

$target_path = "imgs/";
$newfile=$target_path.$newfilebase;

$MySql="SELECT * FROM personaggi WHERE IDutente = '$IDutente' ";
$Result=mysql_query($MySql);
if (mysql_errno()) { die ( mysql_errno().": ".mysql_error(). "  >>".$MySql ); }
if ($res=mysql_fetch_array($Result)) {

	$MySql="UPDATE personaggi SET URLimg = '$newfile' WHERE IDutente = '$IDutente' ";
	$Result=mysql_query($MySql);
} else {
	$MySql="INSERT INTO personaggi (IDutente , URLimg ) VALUES ( '$IDutente' , '$newfile') ";
	$Result=mysql_query($MySql);
}

header("HTTP/1.1 200 OK");
$out=[];

echo json_encode ($out, JSON_UNESCAPED_UNICODE);
?>
