<?php

function pushmsg ($fields) {

	$api_key = "AAAAlMq6uFA:APA91bF7OkCZ11uzQj-GdldCnHsVH2Rnx0qs7H2PjB65Nur9Nz5FT0N0uinPP7bJio0oDyc3NJqhIhvH1nEoVSfgcuLO-0Or8Qou2c13asH5GK4iO00uj9waAAGIcGg-d2dtiEXJ7v9b";
	$ch = curl_init('https://fcm.googleapis.com/fcm/send');

	$headers = array (
		'Authorization: key=' . $api_key,
		'Content-Type: application/json'
	);

	$post=json_encode($fields, JSON_UNESCAPED_SLASHES);

	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

	curl_setopt($ch, CURLOPT_POSTFIELDS, $post );
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	// Disabling SSL Certificate support temporarly
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	// execute!
	$response = curl_exec($ch);

	// close the connection, release resources used
	curl_close($ch);

	//die(print_r($response));

}


function user2master ( $idutente , $testo ) {

	$Mysql="SELECT nomepg FROM personaggio WHERE idutente=$idutente";
	$Result=mysql_query($Mysql);
	$res=mysql_fetch_array($Result) ;
	$nomepg=$res['nomepg'];

	$fields =  array(
		'to' => '/topics/master',
		'data'=> [
			'message'=> $testo ,
			'title'=> $nomepg,
			'image'=> 'icon'
		]
	);
	pushmsg ($fields);
}


function master2master ( $testo ) {
	$fields =  array(
		'to' => '/topics/master',
		'data'=> [
			'message'=> $testo ,
			'title'=> 'NARRAZIONE',
			'image'=> 'icon'
		]
	);
	pushmsg ($fields);
}

function master2user ( $idutente , $testo ) {

	$Mysql="SELECT registrationID FROM personaggi WHERE IDutente=$idutente";
	$Result=mysql_query($Mysql);
	$res=mysql_fetch_array($Result);

	if ($res['registrationID'] != "" ) {

		$fields= array(
			'to'=>$res['registrationID'],
			'data'=> [
				'message'=> $testo ,
				'title'=> 'Narrazione',
				'image'=> 'icon'
			]
		);

	} else {

		$fields= array(
			'to'=>'/topics/userid'.$idutente,
			'data'=> [
				'message'=> $testo ,
				'title'=> 'NARRAZIONE',
				'image'=> 'icon'
			]
		);

	}

	pushmsg ($fields);
}












?>
