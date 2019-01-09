<?php
	include ('messaggi.php');

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


$MySql ="SELECT Sanita, Miti, PF FROM personaggi WHERE IDutente = $IDutente";
$Result = mysql_query($MySql);
$res=mysql_fetch_array($Result);

$oldmiti=$res['Miti'];
$oldsanita=$res['Sanita'];
$oldPF=$res['PF'];

$MySql="UPDATE personaggio SET ";

if ($cosa=='S') {
	if ( $delta=='1' && $oldsanita < 10 && $oldsanita < 10-$oldmiti ) {
		$MySql = "UPDATE personaggi SET Sanita = Sanita +1 WHERE IDutente=$IDutente" ;
		$msg="Hai guadagnato un punto di Sanità Mentale";
	}
	if ( $delta=='-1' && $oldsanita > 0 ) {
		$MySql = "UPDATE personaggi SET Sanita = Sanita -1 WHERE IDutente=$IDutente" ;
		$msg="Hai perso un punto di Sanità Mentale";
	}
}

if ($cosa=='M') {
	if ( $delta=='1' && $oldmiti < 10 && $oldsanita < 10-$oldmiti ) {
		$MySql = "UPDATE personaggi SET Miti = Miti +1 WHERE IDutente=$IDutente" ;
		$msg="Hai guadagnato un punto di Conoscenza dei Miti";
	}
	if ( $delta=='1' && $oldmiti < 10 && $oldsanita >= 10-$oldmiti ) {
		$MySql = "UPDATE personaggi SET Miti = Miti +1 , Sanita=Sanita-1 WHERE IDutente=$IDutente" ;
		$msg="Hai guadagnato un punto di Conoscenza dei Miti ma hai perso un punto di Sanità Mentale";
	}

	if ( $delta=='-1' && $oldmiti > 0 ) {
		$MySql = "UPDATE personaggi SET Miti = Miti -1 WHERE IDutente=$IDutente" ;
		$msg="Hai perso un punto di Conoscenza dei Miti";
	}
}

if ($cosa=='P') {
	if ( $delta=='1' && $oldPF < 5  ) {
		$MySql = "UPDATE personaggi SET PF = PF +1 WHERE IDutente=$IDutente" ;
		$msg="Hai guadagnato un punto Salute";
	}


	if ( $delta=='-1' && $oldPF > 0 ) {
		$MySql = "UPDATE personaggi SET PF = PF -1 WHERE IDutente=$IDutente" ;
		$msg="Hai perso un punto Salute";
	}

	if ( $delta=='-1' && $oldPF == 1 ) {
		$MySql = "UPDATE personaggi SET PF = PF -1 WHERE IDutente=$IDutente" ;
		$msg="Hai perso un punto Salute e quindi sei morto!";
	}

}

$Result = mysql_query($MySql);

master2user($IDutente,$msg );


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
