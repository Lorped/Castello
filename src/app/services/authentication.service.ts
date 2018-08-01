import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map' ;

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Castello/wsPHP/login.php', {
      email: email,
      password: password
    })
    .map(user => {
      // login successful if there's a jwt token in the response
      if (user && user[0].IDutente) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('CastelloUser', user[0].IDutente );
      }

      return user[0];
    });
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('CastelloUser');
  }
}
