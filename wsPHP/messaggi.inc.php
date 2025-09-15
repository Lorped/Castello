<?php

include "get_access_token.php";



function pushmsg ($data) {

	$url = "https://fcm.googleapis.com/v1/projects/castello-a99be/messages:send";

	$access_token = get_access_token("/web/htdocs/www.roma-by-night.it/home/Castello/wsPHP/castello-a99be-9527f3cbc445.json");
    
    $options = array(
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer " . $access_token,
            "Content-Type: application/json",
        ),
        CURLOPT_POSTFIELDS => json_encode($data),
    );
    $curl = curl_init();
    curl_setopt_array($curl, $options);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;

}


function user2master ( $idutente , $testo, $db ) {

	$Mysql="SELECT NomePG, CognomePG FROM personaggi WHERE idutente=$idutente";
	$Result=mysqli_query($db, $Mysql);
	if ( $res=mysqli_fetch_array($Result) ) {
		$nomepg=$res['NomePG'];
		$cognomepg=$res['CognomePG'];
	}

	$Mysql="SELECT registrationID FROM master";
	$Result=mysqli_query($db, $Mysql);
	$res=mysqli_fetch_array($Result);

	if ($res['registrationID'] != "" ) {

		$token= $res['registrationID'];

		$data = [
			'message' => [
				"notification"=> [
					"title" => "CASTELLO",
					"body" => $nomepg." ".$cognomepg.": ".$testo,
					// 'sound' => 'default',
					// 'notification_priority' => '2'
				],
				"android" => [
					"notification" => [
						"channel_id" => "PushPluginChannel"
					]
				],
				'token' => $token
				//'topic' => 'master' 
			]
		]; 
	} else {   //potrebbe non arriavare ma ok

		$data = [
			'message' => [
				"notification"=> [
					"title" => "CASTELLO",
					"body" => $nomepg." ".$cognomepg.": ".$testo,

					// 'sound' => 'default',
					// 'notification_priority' => '2'
				],
				"android" => [
					"notification" => [
						"channel_id" => "PushPluginChannel"
					]
				],
				//'token' => $token,
				'topic' => 'master'
			]
		];
	}

	pushmsg ($data);
}


function master2master ( $testo ) {
	$data = [
        'message' => [
            "notification"=> [
                "title" => "CASTELLO",
                "body" => $testo,

                // 'sound' => 'default',
				// 'notification_priority' => '2'
            ],
            "android" => [
                "notification" => [
                    "channel_id" => "PushPluginChannel"
                ]
            ],
            //'token' => $token,
            'topic' => 'master' 
        ]
    ];

	pushmsg ($data);

}

function master2user ( $idutente , $testo , $db) {

	$Mysql="SELECT registrationID FROM personaggi WHERE IDutente=$idutente";
	$Result=mysqli_query($db, $Mysql);
	$res=mysqli_fetch_array($Result);

	if ($res['registrationID'] != "" ) {

		$token= $res['registrationID'];

		$data = [
			'message' => [
				"notification"=> [
					"title" => "CASTELLO",
					"body" => $testo,
	
					// 'sound' => 'default',
					// 'notification_priority' => '2'
				],
				"android" => [
					"notification" => [
						"channel_id" => "PushPluginChannel"
					]
				],
				'token' => $token,
				//'topic' => 'master' 
			]
		];
	
		pushmsg ($data);

	} else {

		// NON FACCIO NULLA

	}




}




function user2user ( $nomepg, $destinatario , $testo , $db) {

	$Mysql="SELECT registrationID FROM personaggi WHERE IDutente=$destinatario";
	$Result=mysqli_query($db, $Mysql);
	$res=mysqli_fetch_array($Result);

	if ($res['registrationID'] != "" ) {

		$token= $res['registrationID'];

        // echo $token . "<p>" ; 

		$data = [
			'message' => [
				"notification"=> [
					"title" => "CASTELLO",
					"body" => "TELEPATIA da ". $nomepg . ": " . $testo,
	
					// 'sound' => 'default',
					// 'notification_priority' => '2'
				],
				"android" => [
					"notification" => [
						"channel_id" => "PushPluginChannel"
					]
				],
				'token' => $token,
				//'topic' => 'master' 
			]
		];
	
		pushmsg ($data);

	} else {

		// NON FACCIO NULLA

	}




}







?>
