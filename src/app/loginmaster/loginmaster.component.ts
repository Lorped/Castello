import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../services/index';
import { Router } from '@angular/router';


import { Status } from '../globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { getMessaging, } from '@angular/fire/messaging';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
// import { FirebaseApp } from '@angular/fire/compat';
import {initializeApp} from 'firebase/app';
import { getMessaging , getToken , onMessage} from 'firebase/messaging';

import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: './loginmaster.component.html',
    styleUrls: ['./loginmaster.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoginmasterComponent implements OnInit {

  loginCredentials = { email: '' , password: '' };
  errmsg = '';
  returnUrl: string = '';

  loginFormGroup = new FormGroup ({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  hide = true;

  //constructor (private authenticationService: AuthenticationService, private router: Router , private status: Status, private mesg: AngularFireMessaging,public http: HttpClient ,) { }
  constructor (private authenticationService: AuthenticationService, private router: Router , private status: Status, public http: HttpClient ,) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  doLogin() {
    this.authenticationService.loginmaster(this.loginCredentials.email, this.loginCredentials.password)
      .subscribe(
        data => {
          this.status.IDutente = data.IDutente;
          sessionStorage.setItem('CastelloMaster', data.IDutente);

          /***
          provideFirebaseApp(() => initializeApp(environment.firebase));
          console.log("Firebase app initialized:");
          **/
         const app = initializeApp(environment.firebase);
         console.log("Firebase app initialized:");
         console.log(app);

          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              console.log('Notification permission granted.');

              const messaging = getMessaging(app);
              console.log("Firebase messaging initialized:", messaging);

              getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then((currentToken) => {
                if (currentToken) {
                  console.log("Current token:", currentToken);

                  let updateurl = 'https://www.roma-by-night.it/Castello/wsPHPapp/updateid.php?userid=0'+'&id='+currentToken;
                  this.http.get(updateurl).subscribe(res =>  {

                    console.log("Token updated on server:");

                    onMessage(messaging,(payload) => {
                      console.log("Received message:", payload);
                      window.alert("CASTELLO: " + payload.notification?.body);
                      const channel = new BroadcastChannel('my-channel2');
                      channel.postMessage(payload);
                    });
                    
                    //const messaging = getMessaging();
                    //console.log("Firebase messaging initialized:", messaging);
                    /*
                    this.mesg.messages.subscribe((message) => { 
                      window.alert("CASTELLO: " + message.notification?.body);
                      const channel = new BroadcastChannel('my-channel2');
                      channel.postMessage(message);
                    });
                    */

                  });
                }
                
              });


              /***
              this.mesg.requestToken.subscribe( (currentToken) => {

              });
              ***/
             
            };   
          
            this.router.navigate(['master']);

          });

          
        },
        error => {
          if (error.status == 401) {
            this.errmsg = "Errore di autenticazione";
          } else {
            this.errmsg = "Server Error";
          }
          
        });
  }



}
