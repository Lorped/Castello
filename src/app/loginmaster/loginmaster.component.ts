import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/index';
import { Router } from '@angular/router';


import { Status } from '../globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './loginmaster.component.html',
  styleUrls: ['./loginmaster.component.css']
})
export class LoginmasterComponent implements OnInit {

  loginCredentials = { email: '' , password: '' };
  errmsg = '';
  returnUrl: string;

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

  constructor (private authenticationService: AuthenticationService, private router: Router , private status: Status) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  doLogin() {
    this.authenticationService.loginmaster(this.loginCredentials.email, this.loginCredentials.password)
      .subscribe(
        data => {
          this.status.IDutente = data.IDutente;
          this.router.navigate(['master']);
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
