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

$out1 = [];
$out2 = [];
$out3 = [];


$MySql="SELECT logscan.IDutente, logscan.IDoggetto, data,
			NomePG, CognomePG, Miti, Sanita, nome, nomeprofessione
			from logscan
		LEFT JOIN personaggi on personaggi.IDutente = logscan.IDutente
		LEFT JOIN oggetti on oggetti.IDoggetto = logscan.IDoggetto
		LEFT JOIN professioni on professioni.IDprofessione = personaggi.IDprofessione";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);



$Result=mysqli_query($db, $MySql);
while ( $res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
	$out1[] = $res;
}

$MySql="SELECT T1.nome as nome1, T2.nome as nome2, data, NomePG, CognomePG
	FROM logpaired
	LEFT JOIN oggetti AS T1 ON T1.IDoggetto = logpaired.IDoggetto1
	LEFT JOIN oggetti AS T2 ON T2.IDoggetto = logpaired.IDoggetto2
	LEFT JOIN personaggi ON personaggi.IDutente = logpaired.IDutente";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);


$Result=mysqli_query($db, $MySql);
while ( $res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
	$out2[] = $res;
}


$MySql="SELECT logrisposte2.IDutente, logrisposte2.IDoggetto, Risposta, logrisposte2.data, NomePG, CognomePG, nome 
	from logrisposte2 
	LEFT JOIN personaggi on personaggi.IDutente = logrisposte2.IDutente 
	LEFT JOIN oggetti on oggetti.IDoggetto = logrisposte2.IDoggetto ";
$Result=mysqli_query($db, $MySql);
$res=mysqli_fetch_array($Result);


$Result=mysqli_query($db, $MySql);
while ( $res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ) {
	$out4[] = $res;
}

$out = [
	'scan' => $out1,
	'paired' => $out2,
	'risposte' => $out3,
	'enigmi' => $out4
];

header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);


?>
