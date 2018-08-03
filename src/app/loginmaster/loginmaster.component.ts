import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/index';
import { Router } from '@angular/router';

import { Status } from '../globals';

@Component({
  selector: 'app-loginmaster',
  templateUrl: './loginmaster.component.html',
  styleUrls: ['./loginmaster.component.css']
})
export class LoginmasterComponent implements OnInit {

  loginCredentials = { email: '' , password: '' };
  errmsg = '';
  returnUrl: string;

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
          this.errmsg = error.statusText;
        });
  }

}
